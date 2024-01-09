from typing import *
import pickle
import torch
from sklearn.preprocessing import StandardScaler, LabelEncoder
import codecs
import numpy as np
import sys
import cv2
import os
from movieList import movie_index

class StaticType(TypedDict): #target_labelで変換に使用する構造体
  terms: LabelEncoder #数値から単語に変える
  scaler: StandardScaler #比率を統一する
  seq_len: int

#3次元でindex(文章の数), time(動画の長さ), kind(単語の種類)の数値(一致率)から構成される
OUTPUT_FILE = "./outputs.pickle" #outputs[338][86][231]

#データファイル、データファイルの長さ、単語ファイル、単語ファイルの長さ
out: dict[Literal["outputs", "output_lengths", "targets", "target_lengths"], torch.Tensor] = pickle.load(open(OUTPUT_FILE, "rb"))

static: StaticType = pickle.load(open("./KSLD1.9.static.pkl", "rb")) #staticを定義

#pythonファイルからjavascriptファイルに変換するためのプログラム
def data_get(idx, number1):#データ番号、ファイル番号

  #idxの使われている単語の組み合わせ(1次元)
  target = out["targets"][idx, :out["target_lengths"][idx]] #idx(特定の文章)だけを取り出す

  #単語の合致率、合計が1になるように調節している(2次元)
  output = out["outputs"][idx, :out["output_lengths"][idx]].softmax(-1) #idx(特定の文章)だけを取り出す

  #targetを数値から単語に変換する 
  target_label = static["terms"].inverse_transform(target)
  print(target_label) #['私' '弟' '趣味' '映画' '見る']etc

  #target_labelから1要素(単語)づつ抜き出し間に ',' を追加する
  target_label_2 = "','" .join(map(str, target_label)) #私','父','車','買う','しました etc
  
  #すべての要素が0のjavascriptファイルを作成する(グラフの黒い線を描くのに使用)
  with codecs.open(str(number1) + '_outputs.js', 'w', encoding='utf-8') as fout:#ファイルに書き換える(write)
    fout.write("export const myArray")
    fout.write("0 = [")
    for cls in range(len(output)-1):#単語の個数分繰り返す
      fout.write("0, ")
    fout.write("0];")

  #すべての要素が1のjavascriptファイルを作成する(タイムラインバーの塗りつぶりに使用)
  with codecs.open(str(number1) + '_outputs.js', 'a', encoding='utf-8') as fout:#ファイルに追加する(add)
    fout.write("export const myArray")
    fout.write("1 = [")
    for cls in range(len(output)-1):#単語の個数分繰り返す
      fout.write("1, ")
    fout.write("1];")

  #単語ファイル
  with codecs.open(str(number1) + '_outputs.js', 'a', encoding='utf-8') as fout:#ファイルに追加する(add)
    fout.write("export const myArray")
    fout.write("2 = ['")
    fout.write(target_label_2) #私','父','車','買う','しました etc
    fout.write("'];")

  for cls in range(target.shape[-1]): #単語の数だけ繰り返す
    number = target[cls] #使われている単語の番号
    y = output[..., number] #2次元目の値がnumber(特定の単語)だけの1次元目の値のリストを作る
    outputs0 = [l.item() for l in y] #必要な部分を取り出す
    
    with open(str(number1) + '_outputs.js', 'a') as fout:#ファイルに追加する(add)
      fout.write("export const myArray")
      fout.write(str(cls+3)) #0,1のみのファイル、単語ファイルがあるので3から始める
      fout.write(" = ")
      fout.write(str(outputs0)) #特定の単語の一致率の数値を並べたもの
      fout.write(";")
      
#文章の数を入れるだけのファイルを作成
def number_get(number1):
  with codecs.open('number_outputs.js', 'w', encoding='utf-8') as fout:#ファイルに書き換える(write)
    fout.write("export const video_number = ")
    fout.write("[")
    fout.write(str(number1)) #文章の数
    fout.write("];")


def MovieList_get():#動画の順番がわかるように、数値付けするためのリスト
  with codecs.open('MovieList.js', 'w', encoding='utf-8') as fout:#ファイルに書き換える(write)
    fout.write("const movie_index = {")#pythonファイルからjavascriptファイルに変換するためのプログラム

    for count in range(len(movie_index)):#動画の数だけ繰り返す
      fout.write(str(count + 1)) #1足す理由は、indexが1から始まるようにプログラムしてしまったから
      fout.write(": '")
      fout.write(movie_index[count + 1]) #動画のタイトルの名前が入る
      fout.write("',")
    fout.write("}; module.exports = movie_index;")


def capture_single_frame(video_path, output_path):#サムネイルを作成する関数
    cap = cv2.VideoCapture(video_path) #ビデオファイルを開く
    if not cap.isOpened(): #ビデオファイルが正常に開かれたかどうかを確認
        print("Error: Could not open video file.")
        return

    ret, frame = cap.read() #最初のフレームを読み込む
    if not ret: #フレームの読み込みが成功したかどうかを確認
        print("Error: Could not read frame.")
        return

    cv2.imwrite(output_path, frame) #最初のフレームをサムネイルとして保存
    cap.release() #ビデオキャプチャオブジェクトを解放

#ここからがMain関数
number_get(len(movie_index)) #ファイル数の入手
MovieList_get() #動画のリスト
  
for count in range(len(movie_index)): #動画(文章)の数だけ繰り返す
  data_get(count,count + 1) #データ番号、ファイル番号

  video_path = f"./movie/{movie_index[count + 1]}.mp4" #サムネイルを作成する動画ファイルの場所と名前
  output_path = f"./image/{count + 1}.jpg" #作成するサムネイルの場所と名前

  capture_single_frame(video_path, output_path) #サムネイルを作成


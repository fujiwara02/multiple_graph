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

class StaticType(TypedDict):
  terms: LabelEncoder #数値に変える
  scaler: StandardScaler #比率を統一する
  seq_len: int

#outputs[338][86][231]　index, time, kind
OUTPUT_FILE = "./outputs.pickle" 

out: dict[Literal["outputs", "output_lengths", "targets", "target_lengths"], torch.Tensor] = pickle.load(open(OUTPUT_FILE, "rb"))

static: StaticType = pickle.load(open("./KSLD1.9.static.pkl", "rb"))
#C:\Users\mno41\scrollbar_graph\app\src\component


def data_get(idx, number1):#データ番号、ファイル番号

  #idx=335の使われている単語の組み合わせ(1次元)
  target = out["targets"][idx, :out["target_lengths"][idx]]

  #単語の合致率、合計が1になるように調節している(2次元)
  output = out["outputs"][idx, :out["output_lengths"][idx]].softmax(-1)

  #数値から単語に変換する ['私' '弟' '趣味' '映画' '見る']
  target_label = static["terms"].inverse_transform(target)
  print(target_label)

  #tensorから1要素づつ抜き出す
  target_label_2 = "','" .join(map(str, target_label))   
  
  #すべての要素が0のファイルを作成する
  with codecs.open(str(number1) + '_outputs.js', 'w', encoding='utf-8') as fout:
    fout.write("export const myArray")
    fout.write("0 = [")
    for cls in range(len(output)-1):
      fout.write("0, ")
    fout.write("0];")

  #すべての要素が1のファイルを作成する  
  with codecs.open(str(number1) + '_outputs.js', 'a', encoding='utf-8') as fout:
    fout.write("export const myArray")
    fout.write("1 = [")
    for cls in range(len(output)-1):
      fout.write("1, ")
    fout.write("1];")

  #単語ファイル
  with codecs.open(str(number1) + '_outputs.js', 'a', encoding='utf-8') as fout:
    fout.write("export const myArray")
    fout.write("2 = ['")
    fout.write(target_label_2)
    fout.write("'];")

  for cls in range(target.shape[-1]): #必要な分だけ追加

    #使われている単語の番号
    number = target[cls]

    #2次元目の値がclsだけの1次元目の値のリストを作る
    y = output[..., number] 

    outputs0 = [l.item() for l in y]

    with open(str(number1) + '_outputs.js', 'a') as fout:
      fout.write("export const myArray")
      fout.write(str(cls+3))
      fout.write(" = ")
      fout.write(str(outputs0))
      fout.write(";")
      

def number_get(number1):
  #単語ファイル
  with codecs.open('number_outputs.js', 'w', encoding='utf-8') as fout:
    fout.write("export const video_number = ")
    fout.write("[")
    fout.write(str(number1))
    fout.write("];")


def MovieList_get():
  #単語ファイル
  with codecs.open('MovieList.js', 'w', encoding='utf-8') as fout:
    fout.write("const movie_index = {")

    for count in range(len(movie_index)):
      fout.write(str(count + 1))
      fout.write(": '")
      fout.write(movie_index[count + 1])
      fout.write("',")

    fout.write("}; module.exports = movie_index;")


def capture_single_frame(video_path, output_path):

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("Error: Could not open video file.")
        return

    ret, frame = cap.read()
    if not ret:
        print("Error: Could not read frame.")
        return

    cv2.imwrite(output_path, frame)
    cap.release()


number_get(len(movie_index)) #ファイル数の入手
MovieList_get() #動画のリスト
  
for count in range(len(movie_index)):
  data_get(count,count + 1) #データ番号、ファイル番号

  video_path = f"./movie/{movie_index[count + 1]}.mp4"
  output_path = f"./image/{count + 1}.jpg"

  capture_single_frame(video_path, output_path)


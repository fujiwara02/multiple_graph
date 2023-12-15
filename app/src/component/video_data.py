from typing import *
import pickle
import torch
from sklearn.preprocessing import StandardScaler, LabelEncoder
import codecs
import numpy as np
import sys
import cv2
import os



class StaticType(TypedDict):
  terms: LabelEncoder #数値に変える
  scaler: StandardScaler #比率を統一する
  seq_len: int


#outputs[338][86][231]　index, time, kind
OUTPUT_FILE = "C:/Users/mno41/multiple_graph/app/src/component/outputs.pickle" 

out: dict[Literal["outputs", "output_lengths", "targets", "target_lengths"], torch.Tensor] = pickle.load(open(OUTPUT_FILE, "rb"))

static: StaticType = pickle.load(open("C:/Users/mno41/multiple_graph/app/src/component/KSLD1.9.static.pkl", "rb"))
#C:\Users\mno41\scrollbar_graph\app\src\component


def data_get(idx, number1):#データ番号、ファイル番号

  #idx=335の使われている単語の組み合わせ(1次元)
  target = out["targets"][idx, :out["target_lengths"][idx]]
  print(target)

  #単語の合致率、合計が1になるように調節している(2次元)
  output = out["outputs"][idx, :out["output_lengths"][idx]].softmax(-1)

  #数値から単語に変換する ['私' '弟' '趣味' '映画' '見る']
  target_label = static["terms"].inverse_transform(target)

  #tensorから1要素づつ抜き出す
  target_label_2 = "','" .join(map(str, target_label))   
  
  
  #すべての要素が0のファイルを作成する
  with codecs.open(str(number1) + '_outputs.js', 'w', encoding='utf-8') as fout:
    fout.write("export const myArray")
    fout.write(str(number1))
    fout.write("0 = [")
    for cls in range(len(output)-1):
      fout.write("0, ")
    fout.write("0];")

  #すべての要素が1のファイルを作成する  
  with codecs.open(str(number1) + '_outputs.js', 'a', encoding='utf-8') as fout:
    fout.write("export const myArray")
    fout.write(str(number1))
    fout.write("1 = [")
    for cls in range(len(output)-1):
      fout.write("1, ")
    fout.write("1];")

  #単語ファイル
  with codecs.open(str(number1) + '_outputs.js', 'a', encoding='utf-8') as fout:
    fout.write("export const myArray")
    fout.write(str(number1))
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
      fout.write(str(number1))
      fout.write(str(cls+3))
      fout.write(" = ")
      fout.write(str(outputs0))
      fout.write(";")
      
  

def data_notget(number1):

  #単語ファイル
  with codecs.open(str(number1) + '_outputs.js', 'w', encoding='utf-8') as fout:
    fout.write("export const myArray")
    fout.write(str(number1))
    fout.write("7 = [''];")

  for cls in range(7): #0-6
    with open(str(number1) + '_outputs.js', 'a') as fout:
      fout.write("export const myArray")
      fout.write(str(number1))
      fout.write(str(cls))
      fout.write(" = ")
      fout.write("[0]")
      fout.write(";")

    
def movie_make(number):
  # 1. 動画フレームを生成する
  width, height = 640, 480
  num_frames = 100

  frames = [np.ones((height, width, 3), dtype=np.uint8) * i for i in range(num_frames)]

  # 2. フレームを連結して動画にする
  fourcc = cv2.VideoWriter_fourcc(*'mp4v')
  output_dir = './movie/'
  os.makedirs(output_dir, exist_ok=True)
  
  output_filename = os.path.join(output_dir, f'{number}.mp4')
  video_writer = cv2.VideoWriter(output_filename, fourcc, 20.0, (width, height))

  for frame in frames:
    video_writer.write(frame)

  video_writer.release()

    

# Main コマンドライン引数を取得
if len(sys.argv) > 1:
  number = int(sys.argv[1]) #numberの数だけデータを生成する

  for count in range(19):
    if(count + 1 <= number):
      data_get(count,count + 1) #データ番号、ファイル番号
    else:
      data_notget(count + 1) #ファイル番号
      movie_make(count + 1)
    
else:
  print("数値を引数として指定してください。")



#ファイル番号、数値データ
#data_get(1,1)
#data_get(35,3)
#data_get(50,4)
#data_get(65,5)
#data_get(80,6)
#data_get(95,7)
#data_get(110,8)
#data_get(125,9)
#data_get(140,10)

#data_get(170,11)
#data_get(185,12)
#data_get(200,13)

#data_get(230,14)
#data_get(245,15)
#data_get(260,16)
#data_get(275,17)
#data_get(290,18)
#data_get(305,19)

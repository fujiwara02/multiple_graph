from typing import *
import pickle
import torch
from sklearn.preprocessing import StandardScaler, LabelEncoder
import codecs
import numpy as np


class StaticType(TypedDict):
  terms: LabelEncoder #数値に変える
  scaler: StandardScaler #比率を統一する
  seq_len: int


#outputs[338][86][231]　index, time, kind
OUTPUT_FILE = "C:/Users/mno41/multiple_graph/app/src/component/outputs.pickle" 

out: dict[Literal["outputs", "output_lengths", "targets", "target_lengths"], torch.Tensor] = pickle.load(open(OUTPUT_FILE, "rb"))



static: StaticType = pickle.load(open("C:/Users/mno41/multiple_graph/app/src/component/KSLD1.9.static.pkl", "rb"))
#C:\Users\mno41\scrollbar_graph\app\src\component

def data_get(idx, number1):

  #idx=335の使われている単語の組み合わせ(1次元)
  target = out["targets"][idx, :out["target_lengths"][idx]]
  print(target)

  #単語の合致率、合計が1になるように調節している(2次元)
  output = out["outputs"][idx, :out["output_lengths"][idx]].softmax(-1)

  #数値から単語に変換する ['私' '弟' '趣味' '映画' '見る']
  target_label = static["terms"].inverse_transform(target)

  #tensorから1要素づつ抜き出す
  target_label_2 = "','" .join(map(str, target_label))   
  
  #単語ファイル
  with codecs.open(str(number1) + '_targets_word.js', 'w', encoding='utf-8') as fout:
    fout.write("const myArray = ['")
    fout.write(target_label_2)
    fout.write("']; export default myArray;")


  #すべての要素が1のファイルを作成する  
  with codecs.open(str(number1) + '_outputs_allone.js', 'w', encoding='utf-8') as fout:
    fout.write("const myArray = [")
    for cls in range(len(output)-1):
      fout.write("1,")
    fout.write("1]; export default myArray;")


  #すべての要素が0のファイルを作成する
  with codecs.open(str(number1) + '_outputs_allzero.js', 'w', encoding='utf-8') as fout:
    fout.write("const myArray = [")
    for cls in range(len(output)-1):
      fout.write("0, ")
    fout.write("0]; export default myArray;")

  #0に初期化する
  with open(str(number1) + '_outputs0.js', 'w') as fout:  fout.write("const myArray = [0]; export default myArray;")
  with open(str(number1) + '_outputs1.js', 'w') as fout:  fout.write("const myArray = [0]; export default myArray;")
  with open(str(number1) + '_outputs2.js', 'w') as fout:  fout.write("const myArray = [0]; export default myArray;")
  with open(str(number1) + '_outputs3.js', 'w') as fout:  fout.write("const myArray = [0]; export default myArray;")
  with open(str(number1) + '_outputs4.js', 'w') as fout:  fout.write("const myArray = [0]; export default myArray;")


  for cls in range(target.shape[-1]): #使われている単語の数だけループ

    #使われている単語の番号
    number = target[cls]

    #2次元目の値がclsだけの1次元目の値のリストを作る
    y = output[..., number] 


    if(cls == 0):
      #合計を1にするために調節する関数(使わない)
      outputs = [l.item() for l in output[..., 0] ]
      #with open(str(number1) + '_outputs.js', 'w') as fout:
        #fout.write("const myArray = ")
        #fout.write(str(outputs))
        #fout.write("; export default myArray;")


    if(cls == 0):
      outputs0 = [l.item() for l in y]
      with open(str(number1) + '_outputs0.js', 'w') as fout:
        fout.write("const myArray = ")
        fout.write(str(outputs0))
        fout.write("; export default myArray;")
      

    if(cls == 1):
      outputs1 = [l.item() for l in y]
      with open(str(number1) + '_outputs1.js', 'w') as fout:
        fout.write("const myArray = ")
        fout.write(str(outputs1))
        fout.write("; export default myArray;")
    

    if(cls == 2):
      outputs2 = [l.item() for l in y]
      with open(str(number1) + '_outputs2.js', 'w') as fout:
        fout.write("const myArray = ")
        fout.write(str(outputs2))
        fout.write("; export default myArray;")
     

    if(cls == 3):
      outputs3 = [l.item() for l in y]
      with open(str(number1) + '_outputs3.js', 'w') as fout:
        fout.write("const myArray = ")
        fout.write(str(outputs3))
        fout.write("; export default myArray;")
    

    if(cls == 4):
      outputs4 = [l.item() for l in y]
      with open(str(number1) + '_outputs4.js', 'w') as fout:
        fout.write("const myArray = ")
        fout.write(str(outputs4))
        fout.write("; export default myArray;")
      
    
    
#ファイル番号、数値データ
#data_get(1,1)
#data_get(20,2)
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
data_get(305,19)

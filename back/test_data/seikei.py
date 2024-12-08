import random
import json

# テキストファイルの読み込み
input_file = 'matuoka.txt'  # 読み込むテキストファイル名
output_file = 'matuoka.json'  # 出力するJSONファイル名

# 結果を保存するリスト
result = []

# ファイルを一行ずつ読み込む
with open(input_file, 'r', encoding='utf-8') as file:
    lenght=0
    for line in file:
        # ランダムな値を1~256で生成
        random_value = random.randint(1, 256)
        # 行の内容とランダムな値をタプルとしてリストに追加
        result.append({"line": line.strip(), "random_value": random_value})
        lenght+=1

# 合計値を計算
total = sum(item['random_value'] for item in result)

# 結果に合計値を追加
output_data = {
    "data": result,
    "lenght":lenght,
    "total": total
}

# JSONファイルに保存
with open(output_file, 'w', encoding='utf-8') as json_file:
    json.dump(output_data, json_file, ensure_ascii=False, indent=4)

print(f"結果が {output_file} に保存されました。合計値: {total}")

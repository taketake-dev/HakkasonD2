import json

# 読み込むJSONファイルと出力するJSONファイル
input_file = 'matuoka.json'  # 読み込むJSONファイル名
output_file = 'matuoka_kan.json'  # 更新されたJSONを保存するファイル名

# JSONファイルを読み込む
with open(input_file, 'r', encoding='utf-8') as file:
    data = json.load(file)

# "data"の中の"random_value"を合計する
total = sum(item['random_value'] for item in data['data'])

# 合計値を"total"に追加
data['total'] = total

# 更新されたJSONを新しいファイルに保存
with open(output_file, 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print(f"合計値が追加され、{output_file}に保存されました。")

import pandas as pd 

df = pd.read_csv('public\export.csv')
df.to_json('public\data.json', orient='split')

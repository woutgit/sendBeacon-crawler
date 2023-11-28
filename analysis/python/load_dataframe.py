import pandas as pd
import os
from os.path import basename
import glob

MAX_VISITS = -1

def load_dir(dir, ignore_columns):
    dfs = []
    nr_visits = 0
    for json_path in glob.glob(dir):
        nr_visits += 1
        if not MAX_VISITS == -1 and nr_visits > MAX_VISITS:
            break
        json_name = basename(json_path)
        if json_name == 'metadata.json':
            continue

        try:
            visit = pd.read_json(json_path, typ='series', orient='records')
        except Exception as error:
            print('Error reading all files', error)

        columns = []
        values = []

        for item in visit.items():
            if not item[0] == 'data' and item[0] not in ignore_columns:
                columns.append(item[0])
                values.append(item[1])
        for item in visit['data']:
            if item not in ignore_columns:
                columns.append(item)
                if item == 'cmps':
                    values.append(cmps_category(visit))
                else:
                    values.append(visit['data'].get(item))
        
        temp = pd.DataFrame([values], columns=columns)
        dfs.append(temp)
    
    df = pd.concat(dfs, ignore_index=True)
    return df

def cmps_category(visit):
    cmps = visit['data']['cmps']
    if len(cmps) == 0:
        return 'no cmps found'
    for cmp in cmps:
        if cmp['succeeded'] == True:
            continue
        elif cmp['succeeded'] == False:
            return 'cmps failed'
    return 'succeeded'

def unfold_dataframe_column(df, columns):
    unfold_df = df
    for column in columns:
        unfold_df = unfold_df.explode(column)
    return unfold_df
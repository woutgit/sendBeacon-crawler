def unfold_sendBeacon_calls(df):
    def create_list(row):
        if row:
            if row['savedCalls']:
                return row['savedCalls']
        return [{}]

    df_exploded = df.copy()
    df_exploded['apis'] = df_exploded['apis'].map(lambda x: create_list(x))
    df_exploded = df_exploded.explode('apis')

    def get_sources(row):
        if row['apis']:
            if row['apis']['source']:
                return row['apis']['source']
        return ''

    df_exploded['source'] = df_exploded.apply(lambda x: get_sources(x), axis=1)

    def get_first_argument(row):
        if row['apis']:
            if row['apis']['arguments']:
                return row['apis']['arguments'][0]
        return ''

    df_exploded['target'] = df_exploded.apply(lambda x: get_first_argument(x), axis=1)

    def get_second_argument(row):
        if row['apis']:
            if row['apis']['arguments']:
                if len(row['apis']['arguments']) > 1:
                    return row['apis']['arguments'][1]
        return []

    df_exploded['argument'] = df_exploded.apply(lambda x: get_second_argument(x), axis=1)

    df_exploded = df_exploded.drop(['cmps', 'requests', 'apis', 'cookies', 'targets'], axis=1)

    df_exploded = df_exploded[df_exploded['source'] != '']

    return df_exploded
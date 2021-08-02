from __future__ import annotations
import pandas as pd
from typing import NoReturn, Union
from collections.abc import Sequence
import json


def excel_to_json(char_id: str) -> NoReturn:
  move_df: pd.DataFrame = pd.read_csv("csv/{}.csv".format(char_id), encoding='cp949')
  move_dict: dict[int, dict[str, Union[str, int]]] = dict()
  for i, move in move_df.iterrows():
    move_dict[i] = {
      'command': move['num'], 'hit-level': move['hit-level'], 'damage': move['damage'],
      'startup': move['startup'], 'blocked': move['blocked'], 'hit': move['hit'], 
      'counter': move['counter'], 'note': move['note']
    }
  with open('json/noctis.json', 'w') as f:
    json.dump(move_dict, f, indent=2)

excel_to_json("noctis")
import string

import requests


class Client():
  """
  Single client class
  """
  url = "https://w3schools.com/python/demopage.htm";

  def setUrl(self, url: string):
    self.url = url
    return self

  def get(self):
    result = False
    try:
      result = requests.get(self.url).json()
    except:
      return []
    return result

  def post(self, json):
    data = False
    try:
      data = requests.post(self.url, data=json).json()
    except:
      return []
    return data

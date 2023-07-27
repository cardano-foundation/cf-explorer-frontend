import array
import datetime
import decimal
from os import getcwd
from string import Template

import numpy
from client.Client import Client

from entity.Block import Block
from numpy import random


class DataManager():
  """
   Get information from client and write cypress test file
   """
  client: object

  def __init__(self, client: Client):
    self.client = client
    open('../e2e/Dynamic/blockDyn.cy.ts', 'w')
    open('../e2e/Dynamic/epochDyn.cy.ts', 'w')
    open('../e2e/Dynamic/transactionDyn.cy.ts', 'w')

  def generateBlockTest(self, size=20, start=1, end=90237870):

    blocksNo = random.randint(low=start, high=end, size=(size))

    result = self.getBlocks(blocksNo=blocksNo)

    json = self.getHashFromBlock(result)

    self.getBlockDetail(json)
    print("Block testing file generated")
    self.getBlockTransaction(json)
    print("Trasaction testing file generated")


  def generateEpochTest(self, size=20, start=300, end=400):

    epochsNo = random.randint(low=start, high=end, size=(size))
    epochsNo = list(set(epochsNo))
    for epochNo in epochsNo:
      result = self.getEpochs(epochsNo=epochNo)
      self.getEpochDetail(result)
    # json = self.getHashFromBlock(result)

    # self.getBlockDetail(json)
    print("Epoch testing file generated")

  def getBlocks(self, limit=30, blocksNo=numpy.array([])):
    self.client.setUrl('https://api.koios.rest/api/v0/blocks?limit={}'.format(limit))

    if blocksNo.any():
      stringtosend = ''
      coma = ''

      for blockNo in blocksNo:
        stringtosend += coma + "block_height.eq.{}".format(blockNo)
        coma = ','

      self.client.setUrl('https://api.koios.rest/api/v0/blocks?or=({}).'.format(stringtosend))

    result = self.client.get()
    return result

  def getEpochs(self, limit=30, epochsNo=None):
    self.client.setUrl('https://api.koios.rest/api/v0/epoch_info?_include_next_epoch=false&limit={}'.format(limit))

    if epochsNo is not None:
      self.client.setUrl(
        'https://api.koios.rest/api/v0/epoch_info?_include_next_epoch=false&_epoch_no={}'.format(epochsNo))

    return self.client.get()

  def getHashFromBlock(self, result):
    coma = '';
    blockHashes = ''

    for json in result:
      block = Block(**json)
      blockHashes += coma + "\"" + (block.hash) + "\""
      coma = ','

    json = "\"_block_hashes\":[{}]".format(blockHashes)
    json = "{" + json + "}"
    return json

  def getBlockDetail(self, json):

    self.client.setUrl('https://api.koios.rest/api/v0/block_info')
    result = self.client.post(json)
    testScript = '';
    f2 = open('../e2e/Dynamic/blockDyn.cy.ts', 'a')
    f = open('templates/blockDyn.cy.ts', 'r')

    src = Template(f.read())
    for estecha in result:
      try:
        testScript = ""
        totalOutputInAda = 0
        if estecha['total_output'] != None:
          totalOutputInAda = (decimal.Decimal(estecha['total_output']) / decimal.Decimal(1000000))
          if totalOutputInAda % 1 == 0:
            totalOutputInAda = int(totalOutputInAda)
          totalOutputInAda = "{:,}".format(totalOutputInAda)

        if estecha['tx_count']:
          testScript = "\ncy.get('.css-8at8rn').should(\"contain\", \"{}\");".format(
            estecha['tx_count']
          )

        newLine = src.substitute({
          'blockNo': estecha['block_height'],
          'tests': testScript,
          "totalOutputInAda": totalOutputInAda,
          "block_time": datetime.datetime.fromtimestamp(estecha['block_time']).strftime("%m/%d/%Y %H:%M:%S"),
          "tx_count": estecha['tx_count'],
          "epoch_slot": estecha['epoch_slot'],
          "hash": estecha['hash']
        })

        f2.write(newLine)

      except:
        continue
    f2.close()
    f.close()

    return testScript

  def getBlockTransaction(self, jsons):

    self.client.setUrl('https://api.koios.rest/api/v0/block_txs')
    result = self.client.post(jsons)
    testScript = '';

    f2 = open('../e2e/Dynamic/transactionDyn.cy.ts', 'a')
    f = open('templates/transactionDyn.cy.ts', 'r')
    src = Template(f.read())

    for resultJson in result:
      try:
        import json
        resultJson['tx_hashes'] = json.dumps(resultJson['tx_hashes'])
        theCall = '"_tx_hashes": {}'.format(resultJson['tx_hashes'])
        self.client.setUrl('https://api.koios.rest/api/v0/tx_info')
        transactions = self.client.post('{' + theCall + '}')
        topTransactions = 1
        for transaction in transactions:
          topTransactions +=1
          totalOutputInAda = (decimal.Decimal(transaction['total_output']) / decimal.Decimal(1000000))
          if totalOutputInAda % 1 == 0:
            totalOutputInAda = int(totalOutputInAda)
          totalOutputInAda = "{:,}".format(totalOutputInAda)

          newLine = src.substitute({
            'transactionNo': transaction['tx_hash'],
            "tx_timestamp": datetime.datetime.fromtimestamp(transaction['tx_timestamp']).strftime("%m/%d/%Y %H:%M:%S"),
            "total_output": totalOutputInAda,
            'block_height': transaction['block_height'],
            'tests': ''
          })
          f2.write(newLine)
          if topTransactions > 3:
            break

      except:
        continue
    # src = Template(f.read())
    f2.close()
    f.close()

  def getTransactionInfo(self, transactions):
    self.client.setUrl('https://api.koios.rest/api/v0/tx_info')
    # result = self.client.post(jsons).json()
    testScript = '';

  def getEpochDetail(self, json):

    testScript = '';
    f2 = open('../e2e/Dynamic/epochDyn.cy.ts', 'a')
    f = open('templates/epochDyn.cy.ts', 'r')

    src = Template(f.read())

    try:
      newLine = ''
      totalOutputInAda = (decimal.Decimal(json[0]['out_sum']) / decimal.Decimal(1000000))
      totalReward = 'Not available'
      if json[0]['total_rewards'] != None:
        totalReward = (decimal.Decimal(json[0]['total_rewards']) / decimal.Decimal(1000000))
        if totalReward % 1 == 0:
          totalReward = int(totalReward)
        totalReward = "{:,}".format(totalReward)

      if totalOutputInAda % 1 == 0:
        totalOutputInAda = int(totalOutputInAda)
      totalOutputInAda = "{:,}".format(totalOutputInAda)
      newLine = src.substitute({
        'epochNo': json[0]['epoch_no'],
        'start_time': datetime.datetime.fromtimestamp(json[0]['start_time']).strftime("%m/%d/%Y "),
        'end_time': datetime.datetime.fromtimestamp(json[0]['end_time']).strftime("%m/%d/%Y "),
        'total_rewards': totalReward,
        'epoch_no': json[0]['epoch_no'],
        'blk_count': json[0]['blk_count'],
        #'tx_count': json[0]['tx_count'],
        #'out_sum': totalOutputInAda,
        'tests': ''
      })
      f2.write(newLine)
    except:
      print("S0m3t10t3d1j3")

    f2.close()
    f.close()

    return testScript

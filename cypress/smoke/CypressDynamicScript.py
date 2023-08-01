import getopt
import sys

from client.Client import Client
from service.DataManager import DataManager


# client = Client()
# client.setUrl('https://api.koios.rest/api/v0/epoch_info')
# result = client.get()

# for json in result:
#  epoch = Epoch(**json)

# Blocks search
# client.setUrl('https://api.koios.rest/api/v0/blocks')
# result = client.get()

def main(argv):
  opts, args = getopt.getopt(argv, "h", ["blockl=", "epochl=", "blocks=", "blocke=", "epochs=", "epoche="])
  blockLimit = 5
  epochLimit = 50
  blockStart = 1
  blockEnd = 6015246
  epochStart = 1
  epochEnd = 500
  for opt, arg in opts:
    print(opt)
    match opt:
      case '-h':
        print("--blockl block number of random blocks to test")
        print("--blocks block number start")
        print("--blocke block number end")
        print("--epochl epoch number of random epoch to test")
        print("--epochs epoch number start")
        print("--epoche epoch number end")
        sys.exit()
      case '--blockl':
        blockLimit = int(arg)
      case '--epochl':
        epochLimit = int(arg)
      case '--blocks':
        blockStart = int(arg)
      case '--blocke':
        blockEnd = int(arg)
      case '--epochs':
        epochStart = int(arg)
      case '--epoche':
        epochEnd = int(arg)

  dataManager = DataManager(Client())
  dataManager.generateBlockTest(size=blockLimit, start=blockStart, end=blockEnd)
  dataManager.generateEpochTest(size=epochLimit, start=epochStart, end=epochEnd)


if __name__ == "__main__":
  main(sys.argv[1:])

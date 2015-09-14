#encoding:utf-8

import os
import json

def readAll(path):
    fileArr = []
    files = os.listdir(path)
    # print files
    ext = ('jpg', 'png', 'jpeg', 'gif')
    for f in files:
        if f.endswith(ext) and '@' not in f:
            fileArr.append(f)

    print fileArr
    json.dump(fileArr, open('preloadImg.json', 'w'))
    return

if __name__ == '__main__':
    readAll('./images/')


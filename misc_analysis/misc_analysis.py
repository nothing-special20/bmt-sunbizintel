import os
import re

def find_text(text, rootdir):
    file_list = []
    for subdir, dirs, files in os.walk(rootdir):
        for file in files:
            #print os.path.join(subdir, file)
            filepath = subdir + os.sep + file
            if '.git' not in filepath:
                file_list.append(filepath)

    for x in file_list:
        data = open(x, 'rb').read()
        data = str(data)
        if re.search(text.lower(), data.lower()):
            print(x)



if __name__=='__main__':
    dir = os.getcwd()
    dir = os.path.dirname(dir)
    find_text("filing_date", dir)
    # print(os.getcwd())
    print(dir)

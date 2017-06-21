#!/usr/bin/env python

import urllib2
import sys
import json
import csv
from bs4 import BeautifulSoup

def download_movie():
    data = []

    for i in range(1930, 2017):
        print i
        ##https://en.wikipedia.org/wiki/1925_in_film
        ##link = 'https://en.wikipedia.org/wiki/' + str(i) + '_in_film'
        
        link = 'https://en.wikipedia.org/wiki/List_of_American_films_of_'+str(i)
        print link
        soup = BeautifulSoup(urllib2.urlopen(link).read())
        tables = soup.findChildren('table')
        tableCount = len(tables)
        
        #print tables[6]
        #for t in tables[7]:
        
        with open('names_withLinks.csv', 'a') as csvfile:
            csvWriter = csv.writer(csvfile)
            for t in range(1,tableCount):
                rows = tables[t].findChildren(['th', 'tr'])
                for row in rows:
                    cells = row.findChildren('td')
                
                    entry = []
                    if len(cells) == 5:
                        ##print row
                        cellIndex = 0
                        for cell in cells:
                            value = cell.string
                            if cellIndex == 0:
                                try:
                                    link = cell.find("a")['href']
                                except:
                                    link = "NA"
                                    pass
                            cellIndex+=1
                            if value == None:
                                value = "NA"
                            entry.append(value)
                        entry.append(str(i))
                        entry.append(link)
                
#                        print entry
                        try:
                            csvWriter.writerow(entry)
                            print entry
                        except:
                            pass


download_movie()
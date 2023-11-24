#!/bin/bash

find . -name "*.json" -o -name "*.html" -o -name "*.js" | while read -r file; do
    filename=$(basename "$file")
    echo "===================================================================================" >> codigo.txt
    echo -e "\t\t\t\t\t\t\t\t$filename" >> codigo.txt
    echo "===================================================================================" >> codigo.txt
    cat "$file" >> codigo.txt
    echo -e "\n\n" >> codigo.txt
done
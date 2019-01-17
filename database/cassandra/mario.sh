counter=0
while [ $counter -le 6 ]
do
   sed -i '' s/[0-9][0-9]*/$counter/g copy.cql
   cqlsh -f copy.cql
   cat ./copy.cql
   ((counter++))
done

sed -i '' s/[0-9][0-9]*/0/g copy.cql
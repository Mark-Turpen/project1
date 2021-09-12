#url=$1
#or repo name = $1 ?
#url format:  https://github.com/stoned-ape/{repo name}.git

touch .gitignore
echo '*.o \n a.out \n *.dSYM \n *.sh \n' > .gitignore

git init
git add -A
git commit -m "_"
git branch -M main
git remote add origin 'https://Mark-Turpen:'$2'@github.com/Mark-Turpen/'$1'.git'
git push -u origin main

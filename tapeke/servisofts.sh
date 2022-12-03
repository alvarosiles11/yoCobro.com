#COLORS

NONE='\033[00m'
RED='\033[01;31m'
GREEN='\033[01;32m'
YELLOW='\033[01;33m'
PURPLE='\033[01;35m'
CYAN='\033[01;36m'
WHITE='\033[01;37m'
BOLD='\033[1m'
UNDERLINE='\033[4m'
#echo -e "This text is ${RED}red${NONE} and ${GREEN}green${NONE} and ${BOLD}bold${NONE} and ${UNDERLINE}underlined${NONE}."

case ${1} in
"up")
    comand1=${1}
    ;;
"down")
    comand1=${1}
    ;;
"ps")
    comand1=${1}
    ;;
*)
    echo "ERROR: invalid option"
    echo "OPCIONES DISPONIBLES:"
    echo "- up"
    echo "- down"
    echo "- ps"
    echo
    exit 1
    ;;
esac

#PRESENTACION
echo
echo -e "\t\t${RED}ServiSofts${NONE} - docker-compose"
# echo
# sleep 0.5
# echo -e "docker-compose in file:"
echo -e $"\t\t ${GREEN}$(pwd)${NONE}"
echo

# ENTORNO
PS3='Selecciona el entorno:'
pids=$(ls -a ./config/ | grep "^.env\..*")
index=0
for i in $pids; do
    index=$((index + 1))
    val=$(echo $i | cut -d'.' -f 3)
    eval arr[$index]=$val
done

select opt in "${arr[@]}"; do
    if [[ "$opt" ]]; then
        entorno=$opt
        break
    else
        echo "ERROR: not Found"
    fi
done
echo
echo -e "Entorno seleccionao:  ( ${RED}ServiSofts${NONE} - ${GREEN} $entorno ${NONE})"

# COMFIMARCION
# read -p "Iniciar? (Yy/n) " -n 1 -r
# echo
# if [[ $REPLY =~ ^[Yy]$ ]]; then
#     echo
# else
#     exit 1
# fi
dc_de="docker-compose.yaml"
# dc_en="docker-compose.$entorno.yaml"

sudo NAME=${entorno} docker-compose -f $dc_de --env-file ./config/.env.$entorno -p $entorno ${1} ${2}

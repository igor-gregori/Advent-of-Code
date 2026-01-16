package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	fileName := "input.txt"

	file, err := os.Open(fileName)
	if err != nil {
		fmt.Printf("Erro ao abrir o arquivo: %v\n", err)
		return
	}
	defer file.Close()

	var arrLeft []int
	var arrRight []int
	var arrSimilarity []int

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Fields(line)
		if len(parts) != 2 {
			fmt.Printf("Linha com formato inválido: %s\n", line)
			continue
		}

		first, err1 := strconv.Atoi(parts[0])
		second, err2 := strconv.Atoi(parts[1])
		if err1 != nil || err2 != nil {
			fmt.Printf("Erro ao converter valores: %s\n", line)
			continue
		}

		arrLeft = append(arrLeft, first)
		arrRight = append(arrRight, second)
	}

	if err := scanner.Err(); err != nil {
		fmt.Printf("Erro ao ler o arquivo: %v\n", err)
		return
	}

	for i := 0; i < len(arrLeft); i++ {
		qtd := 0
		for j := 0; j < len(arrRight); j++ {
			if arrLeft[i] == arrRight[j] {
				qtd++
			}
		}
		arrSimilarity = append(arrSimilarity, arrLeft[i]*qtd)
	}

	var result = 0
	for i := 0; i < len(arrSimilarity); i++ {
		result = result + arrSimilarity[i]
	}

	fmt.Printf("%d\n", result)
}

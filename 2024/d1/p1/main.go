package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
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
	var arrDiff []int

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

	sort.Ints(arrLeft)
	sort.Ints(arrRight)

	for i := 0; i < len(arrLeft); i++ {
		var diff = arrLeft[i] - arrRight[i]
		if diff < 0 {
			diff = diff * -1
		}
		arrDiff = append(arrDiff, diff)
	}

	var result = 0
	for i := 0; i < len(arrDiff); i++ {
		result = result + arrDiff[i]
	}

	// for _, n := range arrDiff {
	// 	fmt.Printf("%d\n", n)
	// }

	fmt.Printf("%d\n", result)
}

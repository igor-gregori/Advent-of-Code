import re
import numpy as np
from scipy.optimize import linprog

def solve_machine(line):
    """Solve a single machine's minimum button presses."""
    targets_match = re.search(r'\{([^}]+)\}', line)
    if not targets_match:
        return 0
    
    targets = list(map(int, targets_match.group(1).split(',')))
    m = len(targets)
    
    buttons = []
    for match in re.finditer(r'\(([^)]*)\)', line):
        content = match.group(1).strip()
        if content == '':
            buttons.append([])
        else:
            indices = list(map(int, content.split(',')))
            buttons.append(indices)
    
    n = len(buttons)
    if m == 0 or n == 0:
        return 0

    A = [[0] * n for _ in range(m)]
    for j, affected in enumerate(buttons):
        for idx in affected:
            if 0 <= idx < m:
                A[idx][j] = 1
    
    c = [1.0] * n
    A_eq = np.array(A, dtype=float)
    b_eq = np.array(targets, dtype=float)
    
    result = linprog(c, A_eq=A_eq, b_eq=b_eq, bounds=[(0, None)] * n, method='highs')
    
    if result.success:
        return int(round(result.fun))
    else:
        raise ValueError(f"Could not solve: {result.message}")

def solve_part_two(filename):
    total_presses = 0
    
    with open(filename, 'r') as f:
        for line_num, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            
            presses = solve_machine(line)
            total_presses += presses
            print(f"Machine {line_num}: {presses} presses")
    
    return total_presses

if __name__ == "__main__":
    filename = "input.txt"
    result = solve_part_two(filename)
    print(f"\nTotal minimum presses required: {result}")

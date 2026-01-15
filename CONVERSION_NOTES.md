# C to Python Conversion Notes

## Source
- **Original**: `1d-2d-lookup-example.c` (294 lines of C code)
- **Converted**: `lookup_table.py` (Python 3)

## Key Changes from C to Python

### 1. Data Structures
**C (structs):**
```c
typedef const struct {
  unsigned char ncols;
  int *columns;
  int *table;
} Table1d;
```

**Python (dataclasses):**
```python
@dataclass
class Table1D:
    ncols: int
    columns: List[int]
    table: List[int]
```

### 2. Function Signatures
**C:**
```c
bool lookup1d (Table1d *t, int ix, int *o)
```
- Returns boolean (fault status)
- Output value passed by pointer reference

**Python:**
```python
def lookup1d(t: Table1D, ix: int) -> Tuple[int, bool]:
```
- Returns tuple of (output_value, is_fault)
- More Pythonic approach using return values instead of output parameters

### 3. Memory Management
- **C**: Manual pointer arithmetic for 2D array access
  ```c
  const int *row0 = &t->table[j * t->ncols];
  const int *row1 = &row0[t->ncols];
  ```
- **Python**: Direct list indexing with calculated offsets
  ```python
  row0_start = j * t.ncols
  row1_start = row0_start + t.ncols
  ```

### 4. Integer Division
- **C**: Uses explicit cast to `long` for intermediate calculations to prevent overflow
  ```c
  o = o_low + ((ix - i_low) * (long)o_delta) / i_delta;
  ```
- **Python**: Uses `//` for integer division (Python 3)
  ```python
  o = o_low + ((ix - i_low) * o_delta) // i_delta
  ```

### 5. Type Safety
- **C**: Uses `uint8_t` for indices, `int` for values
- **Python**: Uses type hints (`List[int]`, `Tuple[int, bool]`) for clarity

### 6. Validation
Added `__post_init__` validation in Python dataclasses to ensure:
- Tables have at least 2 elements
- Array lengths match declared sizes
- Total table size is correct (for 2D)

## Features Preserved

✓ Linear interpolation in 1D lookup
✓ Bilinear interpolation in 2D lookup
✓ Edge case handling (clamping values outside table bounds)
✓ Division by zero protection
✓ Fault detection and reporting
✓ Same algorithm logic and flow

## Testing Results

### 1D Lookup
- Out of bounds values correctly clamped
- Interpolation works correctly for in-between values
- Fault flag properly set for edge cases

### 2D Lookup
- Bilinear interpolation working correctly
- Both axes independently handle out-of-bounds values
- Fault flag correctly reports clipping

## Usage Example

```python
from lookup_table import Table1D, Table2D, lookup1d, lookup2d

# Create 1D table
table = Table1D(
    ncols=5,
    columns=[0, 10, 20, 30, 40],
    table=[0, 100, 150, 175, 200]
)

# Lookup value
result, is_fault = lookup1d(table, 15)
print(f"Result: {result}, Fault: {is_fault}")
# Output: Result: 125, Fault: False
```

## Differences and Considerations

1. **No header file needed** - Python imports modules directly
2. **Includes self-test code** - `if __name__ == "__main__"` block with examples
3. **More readable** - Python's syntax makes the algorithm easier to follow
4. **Type hints** - Better IDE support and documentation
5. **Error handling** - Validation in `__post_init__` catches setup errors early

## Performance Notes

- C version optimized for embedded systems (fixed-width integers, minimal allocations)
- Python version prioritizes readability and correctness
- For production ECU code, the C version is more appropriate
- For simulation, prototyping, or education, Python version is easier to work with

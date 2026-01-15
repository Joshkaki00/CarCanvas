"""
Table lookup with interpolation (1-D and 2-D).

This is a 1/2-D table lookup facility. Each function looks up data in a table
structure, interpolating as needed between data points. The 2-D version
looks up along 2 axes and interpolates in two dimensions.

Limitations:
- The table axes (input values) must monotonically increase, or the lookup
  will fail.
"""

from typing import List, Tuple
from dataclasses import dataclass


@dataclass
class Table1D:
    """One dimensional lookup table."""
    
    ncols: int  # Number of elements in the table (must be at least 2)
    columns: List[int]  # List of input values
    table: List[int]  # Table data (output values)
    
    def __post_init__(self):
        """Validate table structure."""
        if self.ncols < 2:
            raise ValueError("Table must have at least 2 columns")
        if len(self.columns) != self.ncols:
            raise ValueError("columns length must match ncols")
        if len(self.table) != self.ncols:
            raise ValueError("table length must match ncols")


@dataclass
class Table2D:
    """Two dimensional lookup table."""
    
    ncols: int  # Number of columns (X values) in the table (must be at least 2)
    nrows: int  # Number of rows (Y values) in the table (must be at least 2)
    columns: List[int]  # X-axis input values list
    rows: List[int]  # Y-axis input values list
    table: List[int]  # Table data (ncols x nrows), arranged in rows
    
    def __post_init__(self):
        """Validate table structure."""
        if self.ncols < 2:
            raise ValueError("Table must have at least 2 columns")
        if self.nrows < 2:
            raise ValueError("Table must have at least 2 rows")
        if len(self.columns) != self.ncols:
            raise ValueError("columns length must match ncols")
        if len(self.rows) != self.nrows:
            raise ValueError("rows length must match nrows")
        if len(self.table) != self.ncols * self.nrows:
            raise ValueError("table length must be ncols * nrows")


def lookup1d(t: Table1D, ix: int) -> Tuple[int, bool]:
    """
    1-D table lookup with interpolation.
    
    This function performs a 1-D table lookup with interpolation. The output
    value is clamped to either of the table end values when the input value is
    out of bounds.
    
    Args:
        t: table data structure
        ix: input (X-axis) value
    
    Returns:
        Tuple of (output value, is_fault)
        - output value: interpolated result
        - is_fault: True if the lookup result is suspect due to clipping,
                    False on successful lookup
    """
    
    # Off the end of the table
    if ix > t.columns[t.ncols - 1]:
        return t.table[t.ncols - 1], True
    
    # Off beginning of the table
    elif ix < t.columns[0]:
        return t.table[0], True
    
    # Within the bounds of the table
    for i in range(t.ncols - 1):
        if t.columns[i] <= ix <= t.columns[i + 1]:
            # Output (table) low value
            o_low = t.table[i]
            # Input (X-axis) low value
            i_low = t.columns[i]
            # Spread between the two adjacent input values
            i_delta = t.columns[i + 1] - t.columns[i]
            # Spread between the two adjacent table output values
            o_delta = t.table[i + 1] - t.table[i]
            
            # Prevent division by zero. We could get here if two consecutive
            # input values in the table are the same.
            if i_delta == 0:
                return o_low, True
            
            # Linear interpolation
            o = o_low + ((ix - i_low) * o_delta) // i_delta
            return o, False
    
    # Didn't find it (we shouldn't ever get here)
    return 0, True


def lookup2d(t: Table2D, ix: int, iy: int) -> Tuple[int, bool]:
    """
    2-D table lookup with bilinear interpolation.
    
    This function performs a 2-D table lookup with interpolation. The output
    value is clamped to either of the table end values when the input value is
    out of bounds.
    
    Args:
        t: table data structure
        ix: input (X-axis) value
        iy: input (Y-axis) value
    
    Returns:
        Tuple of (output value, is_fault)
        - output value: interpolated result
        - is_fault: True if the lookup result is suspect due to clipping,
                    False on successful lookup
    """
    
    # Set whenever one of the lookups goes off the end of the table
    is_fault = False
    
    # ------------------------------------------------------------------------
    # X axis coordinate lookup
    
    # Off the end of the table
    if ix > t.columns[t.ncols - 1]:
        # Pretend the input value is right at the table edge so that
        # interpolation works as expected
        ix = t.columns[t.ncols - 1]
        i = t.ncols - 2  # Need i and i+1 to be valid
        is_fault = True
    
    # Off beginning of the table
    elif ix < t.columns[0]:
        ix = t.columns[0]
        i = 0
        is_fault = True
    
    # Within the bounds of the table
    else:
        i = 0
        for i in range(t.ncols - 1):
            if t.columns[i] <= ix <= t.columns[i + 1]:
                break
    
    # ------------------------------------------------------------------------
    # Y axis coordinate lookup
    
    # Off the bottom of the table
    if iy > t.rows[t.nrows - 1]:
        iy = t.rows[t.nrows - 1]
        j = t.nrows - 2  # Need j and j+1 to be valid
        is_fault = True
    
    # Off the top of the table
    elif iy < t.rows[0]:
        iy = t.rows[0]
        j = 0
        is_fault = True
    
    # Within the bounds of the table
    else:
        j = 0
        for j in range(t.nrows - 1):
            if t.rows[j] <= iy <= t.rows[j + 1]:
                break
    
    # ------------------------------------------------------------------------
    # 2-D bilinear interpolation
    
    # At this point we know that the input X value is between
    # column[i] and column[i+1] and that the input Y value is between
    # row[j] and row[j+1]. Therefore we have a rectangle in which we need
    # to interpolate.
    #
    # To do the interpolation, we first interpolate between column i and
    # column i+1 on the upper row j. Then, we interpolate between the same
    # columns on row j+1. Finally, we interpolate vertically between the two
    # rows based on the input Y value.
    #
    # row0 is the upper row data and row1 is the lower (higher subscript) row
    # data.
    
    # Get pointers to the two rows
    row0_start = j * t.ncols
    row1_start = row0_start + t.ncols
    
    # Difference between the two adjacent column values
    i_delta = t.columns[i + 1] - t.columns[i]
    # Difference between the two adjacent row values
    j_delta = t.rows[j + 1] - t.rows[j]
    # Low column value
    i_low = t.columns[i]
    # Low row value
    j_low = t.rows[j]
    
    # Prevent division by zero if the input values aren't increasing.
    # If no division by zero, interpolate between columns in the upper and
    # lower row.
    if i_delta == 0:
        o0 = t.table[row0_start + i]
        o1 = t.table[row1_start + i]
        is_fault = True
    else:
        # Interpolate the upper row
        o_low = t.table[row0_start + i]  # Row value at low column #
        o_delta = t.table[row0_start + i + 1] - t.table[row0_start + i]  # Difference from next column
        o0 = o_low + ((ix - i_low) * o_delta) // i_delta
        
        # Interpolate the lower (higher subscript) row
        o_low = t.table[row1_start + i]  # Row value at low column #
        o_delta = t.table[row1_start + i + 1] - t.table[row1_start + i]  # Difference from next column
        o1 = o_low + ((ix - i_low) * o_delta) // i_delta
    
    # Guard against division by zero in the row axis. If all is well,
    # interpolate between the two row interpolation results from earlier.
    if j_delta == 0:
        o = o0
        is_fault = True
    else:
        o = o0 + ((iy - j_low) * (o1 - o0)) // j_delta
    
    return o, is_fault


# Example usage and testing
if __name__ == "__main__":
    # Example 1D lookup table
    print("=== 1D Lookup Table Example ===")
    table_1d = Table1D(
        ncols=5,
        columns=[0, 10, 20, 30, 40],
        table=[0, 100, 150, 175, 200]
    )
    
    # Test lookups
    test_values = [-5, 0, 5, 15, 25, 40, 50]
    for val in test_values:
        result, is_fault = lookup1d(table_1d, val)
        status = "CLIPPED" if is_fault else "OK"
        print(f"lookup1d({val:3d}) = {result:4d}  [{status}]")
    
    print("\n=== 2D Lookup Table Example ===")
    # Example 2D lookup table (3x3)
    # Columns (X): [0, 10, 20]
    # Rows (Y): [0, 5, 10]
    # Table:
    #   Y\X   0   10   20
    #   0    10   20   30
    #   5    40   50   60
    #   10   70   80   90
    table_2d = Table2D(
        ncols=3,
        nrows=3,
        columns=[0, 10, 20],
        rows=[0, 5, 10],
        table=[
            10, 20, 30,  # Row 0 (Y=0)
            40, 50, 60,  # Row 1 (Y=5)
            70, 80, 90   # Row 2 (Y=10)
        ]
    )
    
    # Test lookups
    test_coords = [
        (0, 0),      # Corner
        (10, 5),     # Exact point
        (5, 2),      # Needs interpolation
        (15, 7),     # Needs interpolation
        (-5, 0),     # Out of bounds (X)
        (0, -5),     # Out of bounds (Y)
        (25, 15)     # Out of bounds (both)
    ]
    
    for x, y in test_coords:
        result, is_fault = lookup2d(table_2d, x, y)
        status = "CLIPPED" if is_fault else "OK"
        print(f"lookup2d(x={x:3d}, y={y:3d}) = {result:4d}  [{status}]")

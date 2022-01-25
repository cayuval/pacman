function printMat(mat, selector) {
  var strHTML = '<table style="width:800px;height:800px" border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      
      var className = 'cell cell-' + i + '-' + j;
      if(cell===WALL){
        strHTML += '<td style="color:red; background-color: blue;"  class="' + className + '">' + cell + '</td>'
      }
      else strHTML += '<td class="' + className + '">' + cell + '</td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
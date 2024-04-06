function myFunction() {
 var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("input");
  var lastRow = sheet.getLastRow();
  var nColumns = 5; // Modificar este valor dependiendo de las columnas que tengas en el Spreadsheet
  
  // Obtener los valores de todas las filas y columnas requeridas
  var values = sheet.getRange(2, 1, lastRow - 1, nColumns).getValues();

  // Recorrer los valores y procesar cada fila
  for (var i = 0; i < values.length; i++) {
    var sel_event_name = values[i][0];
    var sel_currency = values[i][1];
    var sel_value = values[i][2];
    var sel_eventParam1 = values[i][3];
    var sel_event_time = values[i][4];
    
      UrlFetchApp.fetch(`[ENDPOINT_SERVIDOR][PATH_SERVIDOR]`, {  // Añadir el endpoint de tu servidor y el Path elegido al crear el cliente de Measurement Protocol dentro del contenedor del servidor
      method: "POST",
      payload: JSON.stringify({
        client_id: '999999.999999',
        event_time: sel_event_time,
        data_processing_options_country: 0,
        data_processing_options_state: 0,
      events: [{
          name: sel_event_name,
          params: {
            "external_id": sel_eventParam1,
            "currency": sel_currency,
            "value": sel_value}
      }]
    })
    })

// Limpiar la pestaña "input"
if (lastRow > 1) {
  var outputSheet = spreadsheet.getSheetByName("output");

  // Fecha de hoy
  var currentDate = new Date();
  
  // Copiar los valores de "input" a la pestaña de "output" excepto los encabezados
  var inputRange = sheet.getRange(2, 1, lastRow - 1, nColumns);
  var outputRange = outputSheet.getRange(outputSheet.getLastRow() + 1, 1, lastRow - 1, nColumns);
  inputRange.copyTo(outputRange);
  
  // Añadir la fecha de hoy en una nueva columna en la pestaña de "output"
  var lastOutputRow = outputSheet.getLastRow();
  var dateColumn = outputSheet.getRange(lastOutputRow - lastRow + 2, nColumns + 1, lastRow - 1, 1);
    dateColumn.setValue(currentDate);
  
  // Limpiar las filas de "input" excepto los encabezados
  sheet.getRange(2, 1, lastRow - 1, nColumns).clearContent();
}
}  
}

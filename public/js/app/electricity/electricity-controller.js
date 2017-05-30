var ElectricityController = function (ElecitrycityService) {
    'use strict';
    var electricityData;
    var bindElectricityGrid;
    var bindButtons;
    var rebindRows;
    var selectedYear= new Date().getFullYear() ;
    var isRebind = false;
    var months = ['January','February','March','April','May','June','July','Aughust','September','October','November','December'];    
            
    var pageLoad = function (selectedYear) {
        
        selectedYear =  selectedYear || new Date().getFullYear();
        $('.selectpicker').selectpicker('val', selectedYear);

        ElecitrycityService
            .getCurrentYearData(selectedYear)
            .then((data) => {
                electricityData = data;
                bindElectricityGrid(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    bindElectricityGrid = function (electricityData) {

        var gridElectricity = $('#grid-electricity');
        var gridElectricityBody  = $('#grid-electricity tbody');
        
        gridElectricityBody.empty();
                            
        $.each(electricityData, function (key, value) {
            var difference = value.new - value.old;
            var totalMoney = difference * value.ratePerUnit;
            var rowContent = '';
            rowContent += `<tr data-editable="true" data-id=${value._id}>`;
            rowContent += `<td data-value="${value.month}">` + value.month + '</td>';
            rowContent += `<td data-value="${value.old}">` + value.old + '</td>';
            rowContent += `<td data-value="${value.new}">` + value.new + '</td>';
            rowContent += `<td data-value="${difference}">` + difference + '</td>';
            rowContent += `<td data-value="${value.ratePerUnit}">` + value.ratePerUnit + '</td>';
            rowContent += `<td data-value="${totalMoney}">` + totalMoney + '</td>';
            rowContent += '<td><button class="btn btn-small btn-edit">Edit</button></td>';
            rowContent += '</tr>'
            gridElectricity.append(rowContent);
        });
        bindButtons();
    };

    //Edit button clicked
    bindButtons = function () {
        $('#grid-electricity .btn-edit').unbind('click').bind('click', function () {
        // $('#grid-electricity').on('click', ".btn-edit", function () {
            var tr = $(this).closest("tr");
            var editableRows = $('#grid-electricity tr[data-editable=false]');
            if (editableRows.length > 0) {
                $(editableRows[0]).attr('data-editable', true);
                var tdArray = editableRows.children();
                $.each(tdArray, function (key, value) {
                    var objValue = $(value);
                    if (key < tdArray.length - 1) {
                        var newContent = objValue.attr('data-value');
                        objValue.html(newContent);
                    } else {
                        var newContent = '<button class="btn btn-small btn-edit">Edit</button>';
                        objValue.html(newContent);
                    }
                });
            }
            if (tr.attr('data-editable') === "true") {
                tr.attr('data-editable', false);
                var tdArray = tr.children();
                $.each(tdArray, function (key, value) {
                    var objValue = $(value);
                    if (key < tdArray.length - 1) {
                        if(key ==0 ){
                             objValue.html(getDropDownValue(value.innerHTML));
                        }else{
                            var newContent = `<input type="text" class="form-control" value="${value.innerHTML}"/>`;
                         objValue.html(newContent);
                        }
                       
                    } else {
                        var newContent = '<button class="btn btn-success btn-update">Update</button>';
                        objValue.html(newContent);
                    }
                });
            }
        });
    }

    // Add new row in grid
    $('#add-new-row').on('click', function () {
        console.log(electricityData);
        var addbleRows = $('#grid-electricity tr[data-addable=true]');
        var editableRows = $('#grid-electricity tr[data-editable=false]');


        if (editableRows.length > 0) {
            $(editableRows[0]).attr('data-editable', true);
            var tdArray = editableRows.children();
            $.each(tdArray, function (key, value) {
                var objValue = $(value);
                if (key < tdArray.length - 1) {
                    var newContent = objValue.attr('data-value');
                    objValue.html(newContent);
                } else {
                    var newContent = '<button class="btn btn-small btn-edit">Edit</button>';
                    objValue.html(newContent);
                }
            });
        }
     
        var dropdownContent = getDropDownValue("May");
        if (addbleRows.length > 0)
            return;
        var newContent = '';
        newContent += '<tr data-addable="true">';
        newContent += `<td>${dropdownContent}</td>`
        newContent += '<td><input type="text" class="form-control"/></td>'
        newContent += '<td><input type="text" class="form-control"/></td>'
        newContent += '<td><input type="text" class="form-control"/></td>'
        newContent += '<td><input type="text" class="form-control"/></td>'
        newContent += '<td><input type="text" class="form-control"/></td>'
        newContent += '<td><button class="btn btn-small btn-save">Save</button></td>'
        newContent += '</tr>';
        jQuery('#grid-electricity').append(newContent);
    });

    // save button clic function
    $('#grid-electricity').on('click', ".btn-save", function () {
        var tr = $(this).closest("tr");
        var tdArray = tr.children();
        var payload = {};
        payload.year = selectedYear;
        $.each(tdArray, function (key, value) {
            var objvalue = $(value);
            if (key == 0)
                payload.month = objvalue.find("select option:selected").text();
            else if (key == 1)
                payload.old = objvalue.find("input").val();
            else if (key == 2)
                payload.new = objvalue.find("input").val();
            else if (key == 4)
                payload.ratePerUnit = objvalue.find("input").val();
        })
        ElecitrycityService
            .saveCurrentYearData(payload)
            .then((data) => {
                pageLoad(selectedYear);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // update button click
    $('#grid-electricity').on('click', '.btn-update', function () {
        var tr = $(this).closest("tr");
        var id = tr.attr('data-id');
        var selected = $(this).find("option:selected").val();
        var tdArray = tr.children();
        var payload = {};
        $.each(tdArray, function (key, value) {
            var objvalue = $(value);
            if (key == 0)
                payload.month = objvalue.find("select option:selected").text();
            else if (key == 1)
                payload.old = objvalue.find("input").val();
            else if (key == 2)
                payload.new = objvalue.find("input").val();
            else if (key == 4)
                payload.ratePerUnit = objvalue.find("input").val();
        });
        ElecitrycityService
            .updateCurrentYearData(id, payload)
            .then((data) => {               
                pageLoad(selectedYear);
            })
            .catch((err) => {
                console.log(err);
            });
    })

    // Label editable
    $('.clickMe').click(function () {
        $(this).hide();
        $('#' + $(this).attr('for'))
            .val($(this).text())
            .toggleClass("form-control")
            .show()
            .focus();
    });

    $('.blur').blur(function () {       
        $(this)
            .hide()
            .toggleClass("form-control");
        var myid = (this).id;
        $('span[for=' + myid + ']')
            .text($(this).val())
            .show();
    });

    // selected index changed in year dropdown
    $('.selectpicker').on('change', function(){
        var selected = $(this).find("option:selected").val();
        selectedYear = selected;
        isRebind = true;
        pageLoad(selectedYear);
    });

    function getDropDownValue(monthName){
        var dropdownContent = `<select class="form-control select-control">`;
        for(var i=0 ;i <months.length ;i++){
            if(monthName == months[i])
                dropdownContent += `<option value="${i}" selected>${months[i]}</option>`;
            else
               dropdownContent += `<option value="${i}">${months[i]}</option>`; 
        }
        dropdownContent += `</select>`
        return dropdownContent;
    }
    //main page call
    pageLoad();
}(ElecitrycityService);
var ElectricityController = function (ElecitrycityService) {
    'use strict';
    var electricityData;
    var bindElectricityGrid;
    var bindButtons;
    var rebindRows;
    var selectedYear ;

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
        if (electricityData.length == 0){
            gridElectricityBody.empty();
        }
            

        
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

    bindButtons = function () {
        $('#grid-electricity').on('click', ".btn-edit", function () {
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
                        var newContent = `<input type="text" class="form-control" value="${value.innerHTML}"/>`;
                        objValue.html(newContent);
                    } else {
                        var newContent = '<button class="btn btn-success btn-update">Update</button>';
                        objValue.html(newContent);
                    }
                });
            }
        });
    }

    rebindRows = function (tr) {
        var isDataEditable = tr.attr('data-editable');
        if (isDataEditable === "false") {
            var tdArray = tr.children();
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
    }

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

        if (addbleRows.length > 0)
            return;
        var newContent = '';
        newContent += '<tr data-addable="true">';
        newContent += '<td><input type="text" class="form-control"/></td>'
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
                payload.month = objvalue.find("input").val();
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
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    $('#grid-electricity').on('click', '.btn-update', function () {
        var tr = $(this).closest("tr");
        var id = tr.attr('data-id');

        var tdArray = tr.children();
        var payload = {};
        $.each(tdArray, function (key, value) {
            var objvalue = $(value);
            if (key == 0)
                payload.month = objvalue.find("input").val();
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
                rebindRows(tr);
            })
            .catch((err) => {
                console.log(err);
            });
    })

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

    $('.selectpicker').on('change', function(){
        var selected = $(this).find("option:selected").val();
        selectedYear = selected;
        pageLoad(selectedYear);
    });
    //main page call
    pageLoad();
}(ElecitrycityService);
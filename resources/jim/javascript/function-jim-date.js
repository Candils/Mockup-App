/*!
 * Copyright 2020 Justinmind. All rights reserved.
 */

(function (window, undefined) { 
	var $simulation = jQuery("#simulation");
	var dateFormat = jimUtil.isMobileDevice() ? "yyyy-MM-dd" : "MM/dd/yyyy",
		timeFormat = "HH:mm",
		dateTimeFormat = jimUtil.isMobileDevice() ? "yyyy-MM-dd'T'HH:mm" : "MM/dd/yyyy HH:mm";

	window.jimDate = {
		"init":function() {
			jimDate.disableInputs($simulation);
			jimDate.setInputFormat($simulation);
			jimDate.onChangeFormatListener();
		},
		"disableInputs" : function($target) {
			if(!jimUtil.isMobileDevice() && !jimDevice.isIOS()) {
	     		$target.find(".date").each(function(){
	    	 		var $date = jQuery(this);
	    	 		$date.find("input").datepicker();
	    	 		if($date.find("input").attr("readonly") != undefined){
	    				$.datepicker._disableDatepicker($date.find("input")[0]);
	    	 		}
	     		});

	     		$target.find(".time").each(function(){
	    	 		var $date = jQuery(this);
	    	 		$date.find("input").timepicker();
	     			if($date.find("input").attr("readonly") != undefined){
	    				$.datepicker._disableDatepicker($date.find("input")[0]);
	    	 		}
	     		});

	     		$target.find(".datetime").each(function(){
	    	 		var $date = jQuery(this);
	    	 		$date.find("input").datetimepicker();
	     			if($date.find("input").attr("readonly") != undefined){
	    				$.datepicker._disableDatepicker($date.find("input")[0]);
	    	 		}
	     		});
     		}
		},
		"setInputFormat" : function($target) {
			$target.find(".date, .time, .datetime").each(function() {
				var targetValue = $(this).attr("value");
				var timestamp = 0;
				var date = new Date();
				try {
					if (isNaN(targetValue)) {
						// when value comes from dataMaster event (new) or from other inputDate value
						// target value is always a date in american format
						if ($(this).is(".time")) {
							var inputDateFormat = $(this).attr("format");
							var parsedDate = parse(targetValue, inputDateFormat, new Date());
							date = jimDate.convertDateToUTC(parsedDate);
						} else
							date = new Date(targetValue);
					}
					else {
						timestamp = parseFloat(targetValue);
						date = jimDate.convertDateToUTC(new Date(timestamp));
					}
				} catch (error) {
					return;
				}
				
       			var inDateFormat = $(this).attr("format");
       			if (jimUtil.isMobileDevice()) {
       				if ($(this).is(".datetime"))
       					inDateFormat = dateTimeFormat;
       				else if ($(this).is(".date"))
       					inDateFormat = dateFormat;
       				else
       					inDateFormat = timeFormat;
       			}

				try {
       				var value = format(date, inDateFormat);
       				$(this).find("input").val(jimUtil.fromHTML(value));
       			} catch (error) {}
	 		});
		},
		"onChangeFormatListener" : function() {
			$simulation.find(".date, .time, .datetime").on("parsedate", function() {
       			var inputValue = $(this).find("input").val();
       			var inputDateFormat = "";
       			if ($(this).is(".datetime"))
       				inputDateFormat = dateTimeFormat;
       			else if ($(this).is(".date"))
       				inputDateFormat = dateFormat;
       			else
       				inputDateFormat = timeFormat;

				try {
					var parsedDate = parse($(this).find("input").val(), inputDateFormat, new Date());
  					var timestamp = parsedDate.getTime();
       				// onChange triggered twice. First from _FormatDate, and another one when input is already formated from _selectDate
       				if (!isNaN(timestamp)) {
         				$(this).attr("value", timestamp);

         				inputDateFormat = $(this).attr("format");
         				
         				var date = new Date(timestamp);
         				var value = format(date, inputDateFormat);
         				$(this).find("input").val(jimUtil.fromHTML(value));
       				}
				} catch (error) {
					$(this).find("input").val(jimUtil.fromHTML(value));
				}
     		});
		},
		"getValueToUSFormat" : function($target) {
			var inputValue = $target.find("input").val();
			var dateFormatFromInput = $target.attr("format");
			var USFormat, value;

       		if (jimUtil.isMobileDevice()) {
       			if ($target.is(".datetime"))
       				dateFormatFromInput = dateTimeFormat;
       			else if ($target.is(".date"))
       				dateFormatFromInput = dateFormat;
   				else
 					dateFormatFromInput = timeFormat;
       		}
				
			var timestamp = (parse(inputValue, dateFormatFromInput, new Date())).getTime();
			if (!isNaN(timestamp)) {
				//var date = jimDate.convertDateToUTC(new Date(timestamp));
				if($target.is(".date"))
					USFormat = "MM/dd/yyyy";
				else if($target.is(".time"))
					USFormat = "HH:mm";
				else if ($target.is(".datetime"))
					USFormat = "MM/dd/yyyy HH:mm";
				
				var date = new Date(timestamp);
         		value = format(date, USFormat);
			}
			return jimUtil.fromHTML(value);
		},
		"convertDateToUTC" : function(nonUTCDate) {
			return new Date(nonUTCDate.getUTCFullYear(), nonUTCDate.getUTCMonth(), nonUTCDate.getUTCDate(), nonUTCDate.getUTCHours(), nonUTCDate.getUTCMinutes(), nonUTCDate.getUTCSeconds());
		},
		"convertToFormatMobile" : function(USDateString, $target) {
			var USFormat = "";
			var mobileFormat = "";
			if($target.is(".date")) {
				USFormat = "MM/dd/yyyy";
				mobileFormat = dateFormat;
			}
			else if($target.is(".time")) {
				USFormat = "HH:mm";
				mobileFormat = timeFormat;
			}
			else if ($target.is(".datetime")){
				USFormat = "MM/dd/yyyy HH:mm";
				mobileFormat = dateTimeFormat;
			}

			try {
				var parsedDate = parse(USDateString, USFormat, new Date());
  				var timestamp = parsedDate.getTime();
       			if (!isNaN(timestamp)) {
         			$(this).attr("value", timestamp);        				
         			var date = new Date(timestamp);
         			var value = format(date, mobileFormat);
         			return value;
       			}
			} catch (error) {
				return "";
			}
		}
	};
})(window);
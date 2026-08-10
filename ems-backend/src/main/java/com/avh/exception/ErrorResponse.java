package com.avh.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String message;
    private Map<String, String> fieldErrors;
	public ErrorResponse(LocalDateTime timestamp, int status, String message, Map<String, String> fieldErrors) {
		super();
		this.timestamp = timestamp;
		this.status = status;
		this.message = message;
		this.fieldErrors = fieldErrors;
	}
	public ErrorResponse() {
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Map<String, String> getFieldErrors() {
		return fieldErrors;
	}
	public void setFieldErrors(Map<String, String> fieldErrors) {
		this.fieldErrors = fieldErrors;
	}
    
}

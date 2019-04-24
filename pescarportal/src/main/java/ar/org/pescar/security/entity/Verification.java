package ar.org.pescar.security.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Random;

@Entity
public class Verification {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name = "USERNAME", length = 50, unique = true)
	private String username;
	@Column(name = "CODE", length = 16, unique = true)
	private String code;
	@Column(name = "TIMESTAMP")
	private Timestamp timestamp;
	@Column(name = "TYPE")
	private String type;

	public Verification(){}

	public Verification(String username, String type) {
		this.username = username;
		this.code = getSaltString(16);
		this.type = type;

		//Create timestamp now
		Date date = new Date();
		this.timestamp = new Timestamp(date.getTime());
	}

	public Long getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setId(Long id) {
		this.id = id;
	}

	private String getSaltString(Integer length) {
		String SALTCHARS = "abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		StringBuilder salt = new StringBuilder();
		Random rnd = new Random();
		while (salt.length() < length) { // length of the random string.
			int index = (int) (rnd.nextFloat() * SALTCHARS.length());
			salt.append(SALTCHARS.charAt(index));
		}
		String saltStr = salt.toString();
		return saltStr;

	}

	public String getCode() {
		return code;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public String getType() {
		return type;
	}
}

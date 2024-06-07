package com.backend.mapper;

import com.backend.domain.ChatMessage;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MessageMapper {
	@Insert("""
					INSERT INTO chat_message
					    (sender, recipient, content, timestamp)
					VALUES (#{sender}, #{recipient}, #{content}, #{timestamp})
					""")
	void insertMessage(ChatMessage message);

	@Select("""
					SELECT * 
					FROM chat_message
					WHERE recipient = #{recipient}
					""")
	List<ChatMessage> findMessagesByRecipient(String recipient);
}

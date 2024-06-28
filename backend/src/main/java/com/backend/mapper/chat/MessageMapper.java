package com.backend.mapper.chat;

import com.backend.domain.chat.ChatMessage;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MessageMapper {
	@Insert("""
					INSERT INTO chat_message
					    (sender_id, recipient_id, content, sender_nick_name, recipient_nick_name)
					VALUES (#{senderId}, #{recipientId}, #{content}, #{senderNickName}, #{recipientNickName})
					""")
	void insertMessage(ChatMessage message);

	@Select("""
					SELECT *
					FROM chat_message
					WHERE recipient_id = #{recipientId}
					""")
	List<ChatMessage> findMessagesByRecipient(Integer recipientId);

	@Select("""
        SELECT *
        FROM chat_message
        WHERE (sender_id = #{senderId} AND recipient_id = #{recipientId})
        OR (sender_id = #{recipientId} AND recipient_id = #{senderId})
        ORDER BY timestamp
        """)
	List<ChatMessage> findMessagesByRoomId(String roomId);

	@Select("""
        SELECT *
        FROM chat_message
        WHERE (sender_id = #{senderId} AND recipient_id = #{recipientId})
        OR (sender_id = #{recipientId} AND recipient_id = #{senderId})
        ORDER BY timestamp
        """)
	List<ChatMessage> findMessagesByRoom(@Param("senderId") Integer senderId, @Param("recipientId") Integer recipientId);
}

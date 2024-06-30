package com.backend.service.member;

import com.backend.domain.member.EmailSender;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

    private final JavaMailSender mailSender;
    private final BCryptPasswordEncoder passwordEncoder;
    private final MemberMapper mapper;

    public String createMail(String username) {
        EmailSender sender = new EmailSender();
        String tempPassword = getTempPassword();

        sender.setAddress(username);
        sender.setTitle("임시 비밀번호 발급");
        sender.setContent("임시 비밀번호: " + tempPassword + "\n 로그인 후 비밀번호를 반드시 변경해 주세요.\n");
        sendEmail(sender);
        updatePassword(username, tempPassword);

        return tempPassword;
    }

    private String getTempPassword() {

        char[] charSet = new char[]{'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
        StringBuilder tempPassword = new StringBuilder();

        int idx = 0;
        for (int i = 0; i < 8; i++) {
            idx = (int) (charSet.length * Math.random());
            tempPassword.append(charSet[idx]);
        }
        return tempPassword.toString();
    }

    private void sendEmail(EmailSender sender) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("petmily2024@naver.com");
        message.setReplyTo("petmily2024@naver.com");
        message.setTo(sender.getAddress());
        message.setSubject(sender.getTitle());
        message.setText(sender.getContent());
        mailSender.send(message);
    }

    public void updatePassword(String username, String tempPassword) {
        String password = passwordEncoder.encode(tempPassword);
        mapper.updatePasswordByEmail(username, password);
    }
}

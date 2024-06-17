package com.backend.security;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.security.KeyFactory;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.text.ParseException;
import java.util.Date;

@Component
public class JWTUtil {

    private final RSAPublicKey publicKey;
    private final RSAPrivateKey privateKey;

    public JWTUtil(@Value("${jwt.public.key}") String publicKeyPath, @Value("${jwt.private.key}") String privateKeyPath) throws Exception {
        this.publicKey = loadPublicKey(publicKeyPath);
        this.privateKey = loadPrivateKey(privateKeyPath);
    }

    private RSAPublicKey loadPublicKey(String filePath) throws Exception {
        Path path = new ClassPathResource(filePath).getFile().toPath();
        byte[] keyBytes = Files.readAllBytes(path);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        return (RSAPublicKey) kf.generatePublic(spec);
    }

    private RSAPrivateKey loadPrivateKey(String filePath) throws Exception {
        Path path = new ClassPathResource(filePath).getFile().toPath();
        byte[] keyBytes = Files.readAllBytes(path);
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        return (RSAPrivateKey) kf.generatePrivate(spec);
    }

    public String getUsername(String token) throws ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        return signedJWT.getJWTClaimsSet().getStringClaim("username");
    }

    public String getRole(String token) throws ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        return signedJWT.getJWTClaimsSet().getStringClaim("role");
    }

    public Boolean isExpired(String token) throws ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        return expirationTime != null && expirationTime.before(new Date());
    }

    public String createJwt(String username, String role, Long expiredMs) throws Exception {
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .claim("username", username)
                .claim("role", role)
                .issueTime(new Date())
                .expirationTime(new Date(System.currentTimeMillis() + expiredMs))
                .build();

        SignedJWT signedJWT = new SignedJWT(
                new JWSHeader.Builder(JWSAlgorithm.RS256).build(),
                claimsSet
        );

        signedJWT.sign(new RSASSASigner(privateKey));
        return signedJWT.serialize();
    }

    public boolean validateToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            RSASSAVerifier verifier = new RSASSAVerifier(publicKey);
            return signedJWT.verify(verifier);
        } catch (Exception e) {
            return false;
        }
    }
}

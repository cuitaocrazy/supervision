package com.yada.encryptByPubk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import javax.crypto.Cipher;
import java.nio.charset.StandardCharsets;
import java.io.ByteArrayOutputStream;
import java.security.Key;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class EncryptByPubkController {

    @RequestMapping(value = "encrypt", method = RequestMethod.GET)
    public String encrypt(String plainText) {
        try {
            String pubkStr = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0FT/LTwXOx1GIwDcOjn8C7pL2Gjv5xhr7PXdEyzyoakiGNc4ed1njQiw/crOziAQpFLZEZfZ9yPi/9/EFQtnexPzqWynYr0Vga0caNVVHqxA7Eivyphv6Tq8H69ecd7umI+8CM9qvsxC/+4Podf3Xnvi5N0ux992ZJKv18RDB0wIDAQAB";
            Key key = getPublicKeyByBase64Str(pubkStr);
            String result = decrypt(plainText, key);
            return result;
        } catch (Exception e) {
            return e.toString();
        }
    }

    private PublicKey getPublicKeyByBase64Str(String base64PublicKey)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        X509EncodedKeySpec pubPkcs8 = new X509EncodedKeySpec(Base64.getDecoder().decode(base64PublicKey));
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePublic(pubPkcs8);
    }

    private String decrypt(String cipherText, Key key) throws Exception {
        cipherText = cipherText.trim();
        byte[] encryptedData = Base64.getDecoder().decode(cipherText);

        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, key);
        int inputLen = encryptedData.length;
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        int offSet = 0;
        byte[] cache;
        int i = 0;
        while (inputLen - offSet > 0) {
            if (inputLen - offSet > 128) {
                cache = cipher.doFinal(encryptedData, offSet, 128);
            } else {
                cache = cipher.doFinal(encryptedData, offSet, inputLen - offSet);
            }
            out.write(cache, 0, cache.length);
            i++;
            offSet = i * 128;
        }
        byte[] dBytes = out.toByteArray();
        try {
            out.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        System.out.println(new String(dBytes, StandardCharsets.UTF_8));
        return new String(dBytes, StandardCharsets.UTF_8);
    }
}
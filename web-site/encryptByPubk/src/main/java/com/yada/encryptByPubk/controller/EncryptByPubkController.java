package com.yada.encryptByPubk.controller;

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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EncryptByPubkController {

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test() {
        return "hello world";
    }

    @RequestMapping(value = "/encrypt", method = RequestMethod.GET)
    public String encrypt(String plainText) {
        try {
            if (plainText == null || plainText.isEmpty()) {
                plainText = "Cj2MfGmBwRTpCP8OdaqDS2XErktzdkV9h01SHBxeJIKWPNVqaKcffdPjoUv7JCz/uroG93YY+yidyjC5SlhwBbesw6UIXZu3Ggufewli6nKWBxyUwK7Rc97cBZSfDcEhtGzt3SN/q06ZbK9I2+5phbOrqlugwCrW+Z9J3c6CzaWvMXo1s9ClxyJ60l9XJWq2KS+Nd1apQYFs/J7PoLRCNDdC6dpECWDxfYYIwD5KtgfoeUjMeOV8GUcMWpaz9Wq3+TWkkxZN5ZVPyOHMYWyTcN2IdWUkLioDZuHk36y85JEkjXflECB5c0x0dZMG6AFqXy1pSoaKVpB7e++zxjo48gGzUMAuJ5JVx2P4qyQD/+kNsEdtfxmM9D5AoEVtWZOTHOeDEYw376Iu1AfIJqTDOxaXpXYCC6kHH+NiVtehVOGRneBZaAFMH3MQYPD8AuukgFD8dySIqLaNBembYR2BMKA/3rRlMIq2pzz+ivxPkGcSu2RwOayo1wdB8WjwoASlgOc3zsgSM4UqpbblacVFn3bcwBlo3QNYwksNpUNTUGgsNjL3LlnNDP1fQ6U6aATmd82n4YDhEkj836m+m9UgjzKIg152gY0rbHRR6lDjDCPPuymz4xAvTiagki3NTZGfYwjwoH4AyRIHlz2ARP2rSW25wY89CSZTCD9KSs9mvKgcx01/CRmadjKXhZmZnC392nkBBwlTocAkSL6AsDujGRBx5LPo1h93+YxdQ4+jjAE/W+qjYP+zxcsFBy2Y2HRDIobxBDD1uOm10n3/ZVKujx5yqDL2bACpfYZOXDisuNySpPZPu2Z26SlYphvJI980C5SRiatfUgJep9N6YL+IWgZtESASrwFNbp/FoRq26UUozFv+vXv5NtHtKPBUIISTrkx74253EOLypKHuk4XUS1pszVtyuCt7omtbWa12qyI4V37js6xjTYyZaI0a6Z8EZqXASiHRw1fus4v42V/gEvzic2d/BIW9EEf137fVvADEPp95FmmHT9+9kAJ2lDW3";
            }
            plainText = plainText.replaceAll(" ", "+");
            System.out.println(plainText);
            System.out.println("--------------------------");
            String pubkStr = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0FT/LTwXOx1GIwDcOjn8C7pL2Gjv5xhr7PXdEyzyoakiGNc4ed1njQiw/crOziAQpFLZEZfZ9yPi/9/EFQtnexPzqWynYr0Vga0caNVVHqxA7Eivyphv6Tq8H69ecd7umI+8CM9qvsxC/+4Podf3Xnvi5N0ux992ZJKv18RDB0wIDAQAB";
            Key key = getPublicKeyByBase64Str(pubkStr);
            String result = decrypt(plainText, key);
            System.out.println(result);
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
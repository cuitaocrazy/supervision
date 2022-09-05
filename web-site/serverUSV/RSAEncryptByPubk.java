import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import javax.crypto.Cipher;
import java.nio.charset.StandardCharsets;
import java.io.ByteArrayOutputStream;
import java.security.Key;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

public class RSAEncryptByPubk {
    public static void main(String args[]) {
        try {

            String pubkStr = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0FT/LTwXOx1GIwDcOjn8C7pL2Gjv5xhr7PXdEyzyoakiGNc4ed1njQiw/crOziAQpFLZEZfZ9yPi/9/EFQtnexPzqWynYr0Vga0caNVVHqxA7Eivyphv6Tq8H69ecd7umI+8CM9qvsxC/+4Podf3Xnvi5N0ux992ZJKv18RDB0wIDAQAB";
            Key key = getPublicKeyByBase64Str(pubkStr);
//            String pString = "lM0FfXvb0NqlcTv5Jeu4H/Z1DcYYpqq/dZ8eVC3P7cDZTVxq//dOI4yX85Nr4HYPC8YwFwnJRGtw/TCrtubwuqI+f4CmYCQf5P7ZOy4xxjNa+naD2BhPYcoguqgPiJQCXWyWgikSWAZ6C40LpCATUIC6fTBiYBRRoKVVfBPjCbJ3QHzppAJl+wDG4kuPX25Qr88EC8CMiWD/kNDxVLof36Y/YzrUicxhErq4J5mxbIoYQW1Lka3zJTu3aR9ZPED+RkTHSvKDF0H452Zcz0Z9iAiST+R+7D7EEqWJ0HEfeFffnJYMhPnocdP0jDAGVPDAeuks/Z0RCkS6Q3d+lwwtZFLL3Eu9T4/Mu41tbJPyEge4qEsgSn3SGb3v5KH5zKU6x0Q7Jdgtef80eQ7TTe1aUez6exKY9qbCHjojLw0O07nsz2DxRu6XXbUwrLApxWaIT6BSzQDNwwc48mAfqvDD6h3MbedQyhbA3tHWC6bHarw2Lf8ZOcd/+iGHHx1/Ic4mZktKx/YJxWBKl4VrdfPOQ2x3RU6VyzASWlEvuz/aJvSctYODknQtSBqOjzGiGOMUbAmL07fTUlbF0KjvAa69FCqFQcUVaziDG3YQIUFeBecAgmUuaR0d20gLJtFMwqRrV2gvFtK+umZiwrBiu4hFteAmQd5AkvDNgW1DDATJcSQ=";

            String result = decrypt(args[0], key);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public static PublicKey getPublicKeyByBase64Str(String base64PublicKey)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        X509EncodedKeySpec pubPkcs8 = new X509EncodedKeySpec(Base64.getDecoder().decode(base64PublicKey));
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePublic(pubPkcs8);
    }

    public static String decrypt(String cipherText, Key key) throws Exception {
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

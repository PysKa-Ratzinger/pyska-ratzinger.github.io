---
title: "HackMyVM Venus (challenge)"
date: 2022-05-06T18:23:17+01:00
tags: hackmyvm
categories: linux
---

## Mission 0x01

{{< highlight plaintext >}}
hacker@venus:~$ ls -lhatr
total 44K
-rw-r--r-- 1 hacker hacker  807 Aug  4  2021 .profile
-rw-r--r-- 1 hacker hacker 3.5K Aug  4  2021 .bashrc
-rw-r----- 1 root   hacker 2.5K Apr  7 05:55 readme.txt
-rw-r----- 1 root   hacker  287 Apr  7 05:55 mission.txt
-rw-r----- 1 root   hacker   16 Apr  7 05:55 .myhiddenpazz
drwxr-xr-x 1 root   root   4.0K Apr  7 05:55 ..
-rw-r----- 1 root   hacker   31 Apr  7 06:00 ...
-rw-r--r-- 1 root   root      0 Apr  8 18:33 .hushlogin
drwxr-x--- 1 root   hacker 4.0K Apr  8 18:33 .
-rwxr-xr-x 1 hacker hacker  220 Apr 17 23:44 .bash_logout
hacker@venus:~$ cat mission.txt
################
# MISSION 0x01 #
################

## EN ##
User sophia has saved her password in a hidden file in this folder. Find it and log in as sophia.

## ES ##
La usuaria sophia ha guardado su contraseña en un fichero oculto en esta carpeta.Encuentralo y logueate como sophia.
hacker@venus:~$ cat .myhiddenpazz
Y1o645M3mR84ejc
hacker@venus:~$ su sophia
Password:
sophia@venus:/pwned/hacker$ cd $HOME
sophia@venus:~$
{{< / highlight >}}

## Mission 0x02

{{< highlight plaintext >}}
sophia@venus:~$ cat mission.txt
################
# MISSION 0x02 #
################

## EN ##
The user angela has saved her password in a file but she does not remember where ... she only remembers that the file was called whereismypazz.txt

## ES ##
La usuaria angela ha guardado su password en un fichero pero no recuerda donde... solo recuerda que el fichero se llamaba whereismypazz.txt
sophia@venus:~$ find / -name whereismypazz.txt 2>/dev/null
/usr/share/whereismypazz.txt
sophia@venus:~$ cat /usr/share/whereismypazz.txt
oh5p9gAABugHBje
sophia@venus:~$ su angela
Password:
angela@venus:/pwned/sophia$ cd $HOME
angela@venus:~$
{{< / highlight >}}

## Mission 0x03

{{< highlight plaintext >}}
angela@venus:~$ cat mission.txt
################
# MISSION 0x03 #
################

## EN ##
The password of the user emma is in line 4069 of the file findme.txt

## ES ##
La password de la usuaria emma esta en la linea 4069 del fichero findme.txt
angela@venus:~$ cat findme.txt | head -n 4069 | tail -n 1
fIvltaGaq0OUH8O
angela@venus:~$ su emma
Password:
emma@venus:/pwned/angela$ cd $HOME
emma@venus:~$
{{< / highlight >}}

## Mission 0x04

{{< highlight plaintext >}}
emma@venus:~$ cat mission.txt
################
# MISSION 0x04 #
################

## EN ##
User mia has left her password in the file -.
## ES ##
La usuaria mia ha dejado su password en el fichero -.
emma@venus:~$ cat ./-
iKXIYg0pyEH2Hos
emma@venus:~$ su mia
Password:
mia@venus:/pwned/emma$ cd $HOME
mia@venus:~$
{{< / highlight >}}

## Mission 0x05

{{< highlight plaintext >}}
mia@venus:~$ cat mission.txt
################
# MISSION 0x05 #
################

## EN ##
It seems that the user camila has left her password inside a folder called hereiam

## ES ##
Parece que la usuaria camila ha dejado su password dentro de una carpeta llamada hereiam
mia@venus:~$ find / -type d -name hereiam 2>/dev/null
/opt/hereiam
mia@venus:~$ ls -lahtr /opt/hereiam
total 12K
-rw-r--r-- 1 root root   16 Apr  7 05:55 .here
drwxr-xr-x 1 root root 4.0K Apr  7 05:55 ..
drwxr-xr-x 2 root root 4.0K Apr  7 05:55 .
mia@venus:~$ cat /opt/hereiam/.here
F67aDmCAAgOOaOc
mia@venus:~$ su camila
Password:
camila@venus:/pwned/mia$ cd $HOME
camila@venus:~$
{{< / highlight >}}

## Mission 0x06

{{< highlight plaintext >}}
camila@venus:~$ cat mission.txt
################
# MISSION 0x06 #
################

## EN ##
The user luna has left her password in a file inside the muack folder.

## ES ##
La usuaria luna ha dejado su password en algun fichero dentro de la carpeta muack.
camila@venus:~$ find ./muack/ -type f
./muack/111/111/muack
camila@venus:~$ cat ./muack/111/111/muack
j3vkuoKQwvbhkMc
camila@venus:~$ su luna
Password:
luna@venus:/pwned/camila$ cd $HOME
luna@venus:~$
{{< / highlight >}}

## Mission 0x07

{{< highlight plaintext >}}
luna@venus:~$ cat mission.txt
################
# MISSION 0x07 #
################

## EN ##
The user eleanor has left her password in a file that occupies 6969 bytes.

## ES ##
La usuaria eleanor ha dejado su password en un fichero que ocupa 6969 bytes.
luna@venus:~$ find / -type f -size 6969c 2>/dev/null
/usr/share/man/man1/h2xs.1.gz
/usr/share/moon.txt
luna@venus:~$ cat /usr/share/moon.txt
UNDchvln6Bmtu7b
luna@venus:~$ su eleanor
Password:
eleanor@venus:/pwned/luna$ cd $HOME
eleanor@venus:~$
{{< / highlight >}}

## Mission 0x08

{{< highlight plaintext >}}
eleanor@venus:~$ cat mission.txt
################
# MISSION 0x08 #
################

## EN ##
The user victoria has left her password in a file in which the owner is the user violin.

## ES ##
La usuaria victoria ha dejado su password en un fichero en el cual el propietario es el usuario violin.
eleanor@venus:~$ find / -user violin 2>/dev/null
/usr/local/games/yo
eleanor@venus:~$ cat /usr/local/games/yo
pz8OqvJBFxH0cSj
eleanor@venus:~$ su victoria
Password:
victoria@venus:/pwned/eleanor$ cd $HOME
victoria@venus:~$
{{< / highlight >}}

## Mission 0x09

{{< highlight plaintext >}}
victoria@venus:~$ cat mission.txt
################
# MISSION 0x09 #
################

## EN ##
The user isla has left her password in a zip file.

## ES ##
La usuaria isla ha dejado su password en un fichero zip.
victoria@venus:~$ find / -type f -name '*.zip' 2>/dev/null
/pwned/victoria/passw0rd.zip
victoria@venus:~$ cat /pwned/victoria/passw0rd.zip | gunzip
D3XTob0FUImsoBb
victoria@venus:~$ su isla
Password:
isla@venus:/pwned/victoria$ cd $HOME
isla@venus:~$
{{< / highlight >}}

## Mission 0x10 (should have been 0x0A)

{{< highlight plaintext >}}
isla@venus:~$ cat mission.txt
################
# MISSION 0x10 #
################

## EN ##
The password of the user violet is in the line that begins with a9HFX (these 5 characters are not part of her password.).

## ES ##
El password de la usuaria violet esta en la linea que empieza por a9HFX (sin ser estos 5 caracteres parte de su password.).
isla@venus:~$ ls
flagz.txt  mission.txt  passy
isla@venus:~$ cat passy | grep "^a9HFX"
a9HFXWKINVzNQLKLDVAc
isla@venus:~$ su violet
Password:
violet@venus:/pwned/isla$ cd $HOME
violet@venus:~$
{{< / highlight >}}

## Mission 0x11

{{< highlight plaintext >}}
violet@venus:~$ cat mission.txt
################
# MISSION 0x11 #
################

## EN ##
The password of the user lucy is in the line that ends with 0JuAZ (these last 5 characters are not part of her password)

## ES ##
El password de la usuaria lucy se encuentra en la linea que acaba por 0JuAZ (sin ser estos ultimos 5 caracteres parte de su password)
violet@venus:~$ ls
end  flagz.txt  mission.txt
violet@venus:~$ cat end | grep "0JuAZ$"
OCmMUjebG53giud0JuAZ
violet@venus:~$ su lucy
Password:
lucy@venus:/pwned/violet$ cd $HOME
lucy@venus:~$
{{< / highlight >}}

## Mission 0x12

{{< highlight plaintext >}}
lucy@venus:~$ cat mission.txt
################
# MISSION 0x12 #
################

## EN ##
The password of the user elena is between the characters fu and ck

## ES ##
El password de la usuaria elena esta entre los caracteres fu y ck
lucy@venus:~$ ls
file.yo  flagz.txt  mission.txt
lucy@venus:~$ cat file.yo | grep "fu.*ck"
fu4xZ5lIKYmfPLg9tck
lucy@venus:~$ su elena
Password:
elena@venus:/pwned/lucy$ cd $HOME
elena@venus:~$
{{< / highlight >}}

## Mission 0x13

{{< highlight plaintext >}}
elena@venus:~$ cat mission.txt
################
# MISSION 0x13 #
################

## EN ##
The user alice has her password is in an environment variable.

## ES ##
La password de alice esta en una variable de entorno.
elena@venus:~$ env | grep -i pass
PASS=Cgecy2MY2MWbaqt
elena@venus:~$ su alice
Password:
alice@venus:/pwned/elena$ cd $HOME
alice@venus:~$
{{< / highlight >}}

## Mission 0x14

{{< highlight plaintext >}}
alice@venus:~$ cat mission.txt
################
# MISSION 0x14 #
################

## EN ##
The admin has left the password of the user anna as a comment in the file passwd.

## ES ##
El admin ha dejado la password de anna como comentario en el fichero passwd.
alice@venus:~$ cat /etc/passwd | cut -d':' -f5 | sort -u

Gnats Bug-Reporting System (admin)
Mailing List Manager
MySQL Server,,,
backup
bin
daemon
games
ircd
lp
mail
man
news
nobody
proxy
root
sync
sys
systemd Network Management,,,
systemd Resolver,,,
systemd Time Synchronization,,,
uucp
w8NvY27qkpdePox
www-data
alice@venus:~$ su anna
Password:
anna@venus:/pwned/alice$ cd $HOME
anna@venus:~$
{{< / highlight >}}

## Mission 0x15

{{< highlight plaintext >}}
anna@venus:~$ cat mission.txt
################
# MISSION 0x15 #
################

## EN ##
Maybe sudo can help you to be natalia.

## ES ##
Puede que sudo te ayude para ser natalia.
anna@venus:~$ sudo -l
Matching Defaults entries for anna on venus:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User anna may run the following commands on venus:
    (natalia) NOPASSWD: /bin/bash
anna@venus:~$ sudo -u natalia /bin/bash
natalia@venus:/pwned/anna$ cd $HOME
natalia@venus:~$
{{< / highlight >}}

## Mission 0x16

{{< highlight plaintext >}}
natalia@venus:~$ cat mission.txt
################
# MISSION 0x16 #
################

## EN ##
The password of user eva is encoded in the base64.txt file

## ES ##
El password de eva esta encodeado en el fichero base64.txt
natalia@venus:~$ ls
base64.txt  flagz.txt  mission.txt  nataliapass.txt
natalia@venus:~$ cat base64.txt | base64 -d
upsCA3UFu10fDAO
natalia@venus:~$ su eva
Password:
eva@venus:/pwned/natalia$ cd $HOME
eva@venus:~$
{{< / highlight >}}

## Mission 0x17

{{< highlight plaintext >}}
eva@venus:~$ cat mission.txt
################
# MISSION 0x17 #
################

## EN ##
The password of the clara user is found in a file modified on May 1, 1968.

## ES ##
La password de la usuaria clara se encuentra en un fichero modificado el 01 de Mayo de 1968.
eva@venus:~$ find / -type f -ls 2>/dev/null | grep "May.*1968"
eva@venus:~$ find / -type f -mtime +100000 2>/dev/null
eva@venus:~$ find / -type f -mtime +50000 2>/dev/null
eva@venus:~$ find / -type f -mtime +20000 2>/dev/null
eva@venus:~$ find / -type f -mtime +10000 2>/dev/null
/usr/lib/cmdo
/usr/share/doc/cron/changelog.gz
/usr/share/doc/cron/THANKS
/usr/share/doc/cron/FEATURES
eva@venus:~$ ls -lhatr /usr/lib/cmdo
-rw-r--r-- 1 root root 16 Jan  1  1970 /usr/lib/cmdo
eva@venus:~$ file /usr/lib/cmdo
/usr/lib/cmdo: ASCII text
eva@venus:~$ cat /usr/lib/cmdo
39YziWp5gSvgQN9
eva@venus:~$ su clara
Password:
clara@venus:/pwned/eva$ cd $HOME
clara@venus:~$
{{< / highlight >}}

## Mission 0x18

{{< highlight plaintext >}}
clara@venus:~$ cat mission.txt
################
# MISSION 0x18 #
################

## EN ##
The password of user frida is in the password-protected zip (rockyou.txt can help you)

## ES ##
La password de frida esta en el zip protegido con password.(rockyou.txt puede ayudarte)
clara@venus:~$ ls -l
total 12
-rw-r----- 1 root clara  31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root clara 247 Apr  7 05:55 mission.txt
-rw-r----- 1 root clara 244 Apr  7 05:55 protected.zip
clara@venus:~$ pwd
/pwned/clara
clara@venus:~$
{{< / highlight >}}

This is the first challenge where we have to transfer files to our machine in
order to solve it. To transfer files between machines, we can use the `scp`
command.

{{< highlight plain >}}
[pyska@Shaman:~] :( scp -P 5000 clara@venus.hackmyvm.eu:/pwned/clara/protected.zip /tmp/protected.zip
clara@venus.hackmyvm.eu's password:
protected.zip                        100%  244     2.1KB/s   00:00
[pyska@Shaman:~] :) cd /tmp
[pyska@Shaman:tmp] :) ls -lhatr
total 12K
drwxrwxrwt. 9 root  root  4.0K May  6 20:38 ..
drwxr-xr-x. 2 pyska pyska 4.0K May  6 20:39 .
-rw-r-----. 1 pyska pyska  244 May  6 20:32 protected.zip
[pyska@Shaman:tmp] :) zip2john ./protected.zip > hash
ver 1.0 efh 5455 efh 7875 protected.zip/pwned/clara/protected.txt PKZIP Encr: 2b chk, TS_chk, cmplen=28, decmplen=16, crc=239F7473 ts=2EF4 cs=2ef4 type=0
[pyska@Shaman:tmp] :) john ./hash --wordlist=/usr/share/dict/seclists/Passwords/Leaked-Databases/rockyou.txt
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 12 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
pass123          (protected.zip/pwned/clara/protected.txt)
1g 0:00:00:00 DONE (2022-05-06 20:39) 100.0g/s 2457Kp/s 2457Kc/s 2457KC/s 123456..280690
Use the "--show" option to display all of the cracked passwords reliably
Session completed.
[pyska@Shaman:tmp] :) unzip ./protected.zip
Archive:  ./protected.zip
[./protected.zip] pwned/clara/protected.txt password:
 extracting: pwned/clara/protected.txt
[pyska@Shaman:tmp] :) cat pwned/clara/protected.txt
Ed4ErEUJEaMcXli
[pyska@Shaman:tmp] :)
{{< / highlight >}}

And now if we go back to the original SSH session:

{{< highlight plaintext >}}
clara@venus:~$ su frida
Password:
frida@venus:/pwned/clara$ cd $HOME
frida@venus:~$
{{< / highlight >}}

## Mission 0x19

{{< highlight plaintext >}}
frida@venus:~$ cat mission.txt
################
# MISSION 0x19 #
################

## EN ##
The password of eliza is the only string that is repeated (unsorted) in repeated.txt.

## ES ##
La password de eliza es el unico string que se repite (sin estar ordenado) en repeated.txt.
frida@venus:~$ uniq -c ./repeated.txt | sort -n | tail -n 1
      2 Fg6b6aoksceQqB9
frida@venus:~$ su eliza
Password:
eliza@venus:/pwned/frida$ cd $HOME
eliza@venus:~$
{{< / highlight >}}

## Mission 0x20

{{< highlight plaintext >}}
eliza@venus:~$ cat mission.txt
################
# MISSION 0x20 #
################

## EN ##
The user iris has left me her key.

## ES ##
La usuaria iris me ha dejado su key.
eliza@venus:~$ ls -l
total 8
-rw-r----- 1 root eliza  31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root eliza 143 Apr  7 05:55 mission.txt
eliza@venus:~$ ls -lha
total 36K
drwxr-x--- 2 root  eliza 4.0K Apr  7 05:55 .
drwxr-xr-x 1 root  root  4.0K Apr  7 05:55 ..
-rw-r--r-- 1 eliza eliza  220 Aug  4  2021 .bash_logout
-rw-r--r-- 1 eliza eliza 3.5K Aug  4  2021 .bashrc
-rw-r----- 1 root  eliza 2.6K Apr  7 05:55 .iris_key
-rw-r--r-- 1 eliza eliza  807 Aug  4  2021 .profile
-rw-r----- 1 root  eliza   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root  eliza  143 Apr  7 05:55 mission.txt
eliza@venus:~$ file .iris_key
.iris_key: OpenSSH private key
eliza@venus:~$ ssh -i ./.iris_key iris@localhost
The authenticity of host 'localhost (127.0.0.1)' can't be established.
ECDSA key fingerprint is SHA256:ARNXOhO4Aisq1Dv96z2ZNk96a8qycr+JIljSMY+JBe8.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Could not create directory '/pwned/eliza/.ssh' (Permission denied).
Failed to add the host to the list of known hosts (/pwned/eliza/.ssh/known_hosts).

 ... BANNER ...

Last login: Wed May  4 06:28:50 2022 from 185.220.100.255
iris@venus:~$
{{< / highlight >}}

## Mission 0x21

{{< highlight plaintext >}}
iris@venus:~$ cat mission.txt
################
# MISSION 0x21 #
################

## EN ##
User eloise has saved her password in a particular way.

## ES ##
La usuaria eloise ha guardado su password de una forma particular.
iris@venus:~$ ls -lhatr
total 60K
-rw-r--r-- 1 iris iris  807 Aug  4  2021 .profile
-rw-r--r-- 1 iris iris 3.5K Aug  4  2021 .bashrc
-rw-r--r-- 1 iris iris  220 Aug  4  2021 .bash_logout
-rw-r----- 1 root iris   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root iris  195 Apr  7 05:55 mission.txt
drwxr-xr-x 1 root root 4.0K Apr  7 05:55 ..
-rw-r----- 1 root iris   16 Apr  7 05:55 irispass.txt
-rw-r----- 1 root iris  18K Apr  7 05:55 eloise
drwxr-xr-x 2 root root 4.0K Apr  7 05:55 .ssh
drwxr-x--- 3 root iris 4.0K Apr  7 05:55 .
iris@venus:~$ cat irispass.txt
kYjyoLcnBZ9EJdz
iris@venus:~$ file eloise
eloise: ASCII text
iris@venus:~$ head -n 2 ./eloise
/9j/4AAQSkZJRgABAQEAYABgAAD/4RDSRXhpZgAATU0AKgAAAAgABAE7AAIAAAAEc01MAIdpAAQA
AAABAAAISpydAAEAAAAIAAAQwuocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAA
iris@venus:~$ cat ./eloise  | base64 -d | head -n 2
JFIF``ExifMM;sMLJ
               8585
                2021:11:10 10:18:032021:11:10 10:18:03sML
                                                         http://ns.adobe.com/xap/1.0/<?xpacket begin='﻿' id='W5M0MpCehiHzreSzNTczkc9d'?>
<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="uuid:faf5bdd5-ba3d-11da-ad31-d33d75182f1b" xmlns:dc="http://purl.org/dc/elements/1.1/"/><rdf:Description rdf:about="uuid:faf5bdd5-ba3d-11da-ad31-d33d75182f1b" xmlns:xmp="http://ns.adobe.com/xap/1.0/"><xmp:CreateDate>2021-11-10T10:18:03.849</xmp:CreateDate></rdf:Description><rdf:Description rdf:about="uuid:faf5bdd5-ba3d-11da-ad31-d33d75182f1b" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:creator><rdf:Seq xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:li>sML</rdf:li></rdf:Seq>
iris@venus:~$
{{< / highlight >}}

So, we can see that the "eloise" file decodes into an image file format. We are
once again going to transfer the file to our machine. Always be careful when
downloading stuff you don't know the origin of.

{{< highlight plaintext >}}
[pyska@Shaman:~] :( scp -P 5000 iris@venus.hackmyvm.eu:/pwned/iris/eloise /tmp/eloise
iris@venus.hackmyvm.eu's password:
eloise                                100%   17KB 100.6KB/s   00:00
[pyska@Shaman:~] :) cd /tmp
[pyska@Shaman:tmp] :) cat eloise | base64 -d > ./out
[pyska@Shaman:tmp] :) file out
out: JPEG image data, JFIF standard 1.01, resolution (DPI), density 96x96, segment length 16, Exif Standard: [TIFF image data, big-endian, direntries=4], baseline, precision 8, 394x102, components 3
[pyska@Shaman:tmp] :) feh ./out
{{< / highlight >}}

The password is written in image format, as we can see here:

![Eloise Password](/img/hackmyvm-venus-eloise.png)

In case you want to copy-paste:

{{< highlight plaintext >}}
yOUJlV0SHOnbSPm
{{< / highlight >}}

We can then login as eloise

{{< highlight plaintext >}}
iris@venus:~$ su eloise
Password:
eloise@venus:/pwned/iris$ cd $HOME
eloise@venus:~$
{{< / highlight >}}

## Mission 0x22

{{< highlight plaintext >}}
eloise@venus:~$ cat mission.txt
################
# MISSION 0x22 #
################

## EN ##
User lucia has been creative in saving her password.

## ES ##
La usuaria lucia ha sido creativa en la forma de guardar su password.
eloise@venus:~$ ls -lhatr
total 36K
-rw-r--r-- 1 eloise eloise  807 Aug  4  2021 .profile
-rw-r--r-- 1 eloise eloise 3.5K Aug  4  2021 .bashrc
-rw-r--r-- 1 eloise eloise  220 Aug  4  2021 .bash_logout
-rw-r----- 1 root   eloise   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root   eloise  194 Apr  7 05:55 mission.txt
drwxr-xr-x 1 root   root   4.0K Apr  7 05:55 ..
-rw-r----- 1 root   eloise   50 Apr  7 05:55 hi
drwxr-x--- 2 root   eloise 4.0K Apr  7 05:55 .
eloise@venus:~$ file hi
hi: ASCII text
eloise@venus:~$ cat hi
00000000: 7576 4d77 4644 5172 5157 504d 6547 500a
eloise@venus:~$ cat hi | xxd -r
uvMwFDQrQWPMeGP
eloise@venus:~$ su lucia
Password:
lucia@venus:/pwned/eloise$ cd $HOME
lucia@venus:~$
{{< / highlight >}}

## Mission 0x23

{{< highlight plaintext >}}
lucia@venus:~$ cat mission.txt
################
# MISSION 0x23 #
################

## EN ##
The user isabel has left her password in a file in the /etc/xdg folder but she does not remember the name, however she has dict.txt that can help her to remember.

## ES ##
La usuaria isabel ha dejado su password en un fichero en la carpeta /etc/xdg pero no recuerda el nombre, sin embargo tiene dict.txt que puede ayudarle a recordar.
lucia@venus:~$ ls /etc/xdg/
ls: cannot open directory '/etc/xdg/': Permission denied
lucia@venus:~$ head -n 3 ./dict.txt

s
hack
lucia@venus:~$ for i in $(cat ./dict.txt); do ls /etc/xdg/$i; done 2>/dev/null
/etc/xdg/readme
lucia@venus:~$ cat /etc/xdg/readme
H5ol8Z2mrRsorC0
lucia@venus:~$ su isabel
Password:
isabel@venus:/pwned/lucia$ cd $HOME
isabel@venus:~$
{{< / highlight >}}

## Mission 0x24

{{< highlight plaintext >}}
isabel@venus:~$ cat mission.txt
################
# MISSION 0x24 #
################

## EN ##
The password of the user freya is the only string that is not repeated in different.txt

## ES ##
La password de la usuaria freya es el unico string que no se repite en different.txt
isabel@venus:~$ cat different.txt | sort | uniq -c | grep "1 "
      1 EEDyYFDwYsmYawj
isabel@venus:~$ su freya
Password:
freya@venus:/pwned/isabel$ cd $HOME
freya@venus:~$
{{< / highlight >}}

## Mission 0x25

{{< highlight plaintext >}}
freya@venus:~$ cat mission.txt
################
# MISSION 0x25 #
################

## EN ##
User alexa puts her password in a .txt file in /free every minute and then deletes it.

## ES ##
La usuaria alexa pone su password en un fichero .txt en la carpeta /free cada minuto y luego lo borra.
freya@venus:~$ while [ 1 ]; do cat /free/*.txt && sleep 20 || sleep 1; done 2>/dev/null
mxq9O3MSxxX9Q3S
^C
freya@venus:~$ su alexa
Password:
alexa@venus:/pwned/freya$ cd $HOME
alexa@venus:~$
{{< / highlight >}}

## Mission 0x26

{{< highlight plaintext >}}
alexa@venus:~$ cat mission.txt
################
# MISSION 0x26 #
################

## EN ##
The password of the user ariel is online! (HTTP)

## ES ##
El password de la usuaria ariel esta online! (HTTP)
alexa@venus:~$ curl localhost
33EtHoz9a0w2Yqo
alexa@venus:~$ su ariel
Password:
ariel@venus:/pwned/alexa$ cd $HOME
ariel@venus:~$
{{< / highlight >}}

## Mission 0x27

{{< highlight plaintext >}}
ariel@venus:~$ cat mission.txt
################
# MISSION 0x27 #
################

## EN ##
Seems that ariel dont save the password for lola, but there is a temporal file.

## ES ##
Parece ser que a ariel no le dio tiempo a guardar la password de lola... menosmal que hay un temporal!
ariel@venus:~$ ls -lhatr
total 44K
-rw-r--r-- 1 ariel ariel  807 Aug  4  2021 .profile
-rw-r--r-- 1 ariel ariel 3.5K Aug  4  2021 .bashrc
-rw-r--r-- 1 ariel ariel  220 Aug  4  2021 .bash_logout
-rw-r----- 1 root  ariel   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root  ariel  254 Apr  7 05:55 mission.txt
drwxr-xr-x 1 root  root  4.0K Apr  7 05:55 ..
-rw-r----- 1 root  ariel  12K Apr  7 05:56 .goas.swp
drwxr-x--- 2 root  ariel 4.0K Apr  7 05:56 .
ariel@venus:~$ vim -r ./.goas.swp
{{< / highlight >}}

Which gives us this:

{{< highlight plaintext >}}
Thats my little DIc with my old and current passw0rds:

-->ppkJjqYvSCIyAhK
-->cOXlRYXtJWnVQEG
--rxhKeFKveeKqpwp
-->RGBEMbZHZRgXZnu
-->IaOpTdAuhSjGZnu
-->NdnszvjulNellbK
-->GBUguuSpXVjpxLc
-->rSkPlPhymYcerMJ
-->PEOppdOkSqJZweH
-->EKvJoTBYlwtwFmv
-->d3LieOzRGX5wud6
-->mYhQVLDKdJrsIwG
-->DabEJLmAbOQxEnD
-->LkWReDaaLCMDlLf
-->cbjYGSvqAsqIvdg
-->QsymOOVbzSaKmRm
-->bnQgcXYamhSDSff
-->VVjqJGRrnfKmcgD
{{< / highlight >}}

After trial and error, the password "d3LieOzRGX5wud6" was found to be the
correct one.

{{< highlight plaintext >}}
ariel@venus:~$ su lola
Password:
lola@venus:/pwned/ariel$ cd $HOME
lola@venus:~$
{{< / highlight >}}

## Mission 0x28

{{< highlight plaintext >}}
lola@venus:~$ cat mission.txt
################
# MISSION 0x28 #
################

## EN ##
The user celeste has left a list of names of possible .html pages where to find her password.

## ES ##
La usuaria celeste ha dejado un listado de nombres de posibles paginas .html donde encontrar su password.
lola@venus:~$ ls -l
total 12
-rw-r----- 1 root lola   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root lola  272 Apr  7 05:55 mission.txt
-rw-r----- 1 root lola 1438 Apr  7 05:56 pages.txt
lola@venus:~$ head ./pages.txt

new-servers
server-updates
SenSage_LEO
1355485668
25101
Real-Time Communication
ulist
VGVsbmV0
15915
lola@venus:~$ for i in $(cat ./pages.txt); do printf "%25s - %s\n" "$i" "$(curl http://localhost/$i.html | wc -c)"; done 2>/dev/null | head -n 4
              new-servers - 153
           server-updates - 153
              SenSage_LEO - 153
               1355485668 - 153
lola@venus:~$ for i in $(cat ./pages.txt); do printf "%25s - %s\n" "$i" "$(curl http://localhost/$i.html | wc -c)"; done 2>/dev/null | grep -v "\- 153$"
                  cebolla - 16
lola@venus:~$ curl http://localhost/cebolla.html
VLSNMTKwSV2o8Tn
lola@venus:~$ su celeste
Password:
celeste@venus:/pwned/lola$ cd $HOME
celeste@venus:~$
{{< / highlight >}}

## Mission 0x29

{{< highlight plaintext >}}
celeste@venus:~$ cat mission.txt
################
# MISSION 0x29 #
################

## EN ##
The user celeste has access to mysql but for what?

## ES ##
La usuaria celeste tiene acceso al mysql, pero para que?
celeste@venus:~$ mysql -u celeste -p
Enter password:
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 121
Server version: 10.5.15-MariaDB-0+deb11u1 Debian 11

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| venus              |
+--------------------+
2 rows in set (0.001 sec)

MariaDB [(none)]> use venus;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [venus]> show tables;
+-----------------+
| Tables_in_venus |
+-----------------+
| people          |
+-----------------+
1 row in set (0.001 sec)

MariaDB [venus]> select * from people limit 5;
+-----------+--------+----------------+
| id_people | uzer   | pazz           |
+-----------+--------+----------------+
|         1 | nuna   | ixpfdsvcxeqdW  |
|         2 | nona   | ixpvcxvcxeqdW  |
|         3 | manue  | ixpfdsfdseqdW  |
|         4 | samoa  | ixperrewrweqdW |
|         5 | dsaewq | ixpefdsfsqdW   |
+-----------+--------+----------------+
5 rows in set (0.001 sec)

MariaDB [venus]>
{{< / highlight >}}

So now we are in a pickle. We know this table has a lot of usernames and
passwords, but it's clear many users are not even real, and so we need to
filter these results.

{{< highlight plaintext >}}
celeste@venus:~$ for i in $(cat /etc/passwd | cut -d':' -f1); do printf "\"%s\", " "$i"; done && echo ""
"root", "daemon", "bin", "sys", "sync", "games", "man", "lp", "mail", "news", "uucp", "proxy", "www-data", "backup", "list", "irc", "gnats", "nobody", "_apt", "systemd-network", "systemd-resolve", "mysql", "messagebus", "systemd-timesync", "Debian-exim", "sshd", "bind", "violin", "executor", "sophia", "angela", "emma", "mia", "camila", "luna", "eleanor", "victoria", "isla", "violet", "lucy", "elena", "alice", "anna", "natalia", "eva", "clara", "frida", "eliza", "iris", "eloise", "lucia", "isabel", "freya", "alexa", "ariel", "lola", "celeste", "nina", "kira", "veronica", "lana", "noa", "maia", "gloria", "alora", "julie", "irene", "adela", "sky", "sarah", "mercy", "paula", "karla", "denise", "zora", "belen", "leona", "ava", "maria", "hacker",
celeste@venus:~$ mysql -u celeste -p
Enter password:
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 130
Server version: 10.5.15-MariaDB-0+deb11u1 Debian 11

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> use venus
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [venus]> SELECT * FROM people WHERE uzer IN ("root", "daemon", "bin", "sys", "sync", "games", "man", "lp", "mail", "news", "uucp", "proxy", "www-data", "backup", "list", "irc", "gnats", "nobody", "_apt", "systemd-network", "systemd-resolve", "mysql", "messagebus", "systemd-timesync", "Debian-exim", "sshd", "bind", "violin", "executor", "sophia", "angela", "emma", "mia", "camila", "luna", "eleanor", "victoria", "isla", "violet", "lucy", "elena", "alice", "anna", "natalia", "eva", "clara", "frida", "eliza", "iris", "eloise", "lucia", "isabel", "freya", "alexa", "ariel", "lola", "celeste", "nina", "kira", "veronica", "lana", "noa", "maia", "gloria", "alora", "julie", "irene", "adela", "sky", "sarah", "mercy", "paula", "karla", "denise", "zora", "belen", "leona", "ava", "maria", "hacker");
+-----------+------+-----------------+
| id_people | uzer | pazz            |
+-----------+------+-----------------+
|        74 | nina | ixpeqdWuvC5N9kG |
+-----------+------+-----------------+
1 row in set (0.003 sec)

MariaDB [venus]> exit
Bye
celeste@venus:~$ su nina
Password:
nina@venus:/pwned/celeste$ cd $HOME
nina@venus:~$
{{< / highlight >}}

## Mission 0x30

{{< highlight plaintext >}}
nina@venus:~$ cat mission.txt
################
# MISSION 0x30 #
################

## EN ##
The user kira is hidding something in http://localhost/method.php

## ES ##
La usuaria kira esconde algo en http://localhost/method.php
nina@venus:~$ curl http://localhost/method.php

I dont like this method!
nina@venus:~$ curl http://localhost/method.php -X POST

I dont like this method!
nina@venus:~$ curl http://localhost/method.php -X PUT

tPlqxSKuT4eP3yr
nina@venus:~$ su kira
Password:
kira@venus:/pwned/nina$ cd $HOME
kira@venus:~$
{{< / highlight >}}

## Mission 0x31

{{< highlight plaintext >}}
kira@venus:~$ cat mission.txt
################
# MISSION 31 #
################

## EN ##
The user veronica visits a lot http://localhost/waiting.php

## ES ##
La usuaria veronica visita mucho http://localhost/waiting.php
kira@venus:~$ curl http://localhost/waiting.php

Im waiting for the user-agent PARADISE.
kira@venus:~$ curl http://localhost/waiting.php -H "User-Agent: PARADISE"

QTOel6BodTx2cwX
kira@venus:~$ su veronica
Password:
veronica@venus:/pwned/kira$ cd $HOME
veronica@venus:~$
{{< / highlight >}}

## Mission 0x32

{{< highlight plaintext >}}
veronica@venus:~$ cat mission.txt
################
# MISSION 0x32 #
################

## EN ##
The user veronica uses a lot the password from lana, so she created an alias.

## ES ##
La usuaria veronica usa mucho la password de lana, asi que ha creado un alias.
veronica@venus:~$ alias
alias lanapass='UWbc0zNEVVops1v'
alias ls='ls --color=auto'
veronica@venus:~$ su lana
Password:
lana@venus:/pwned/veronica$ cd $HOME
lana@venus:~$
{{< / highlight >}}

## Mission 0x33

{{< highlight plaintext >}}
lana@venus:~$ cat mission.txt
################
# MISSION 0x33 #
################

## EN ##
The user noa loves to compress her things.

## ES ##
A la usuaria noa le gusta comprimir sus cosas.
lana@venus:~$ ls -l
total 20
-rw-r----- 1 root lana    31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root lana   161 Apr  7 05:55 mission.txt
-rw-r----- 1 root lana 10240 Apr  7 06:00 zip.gz
lana@venus:~$ cat zip.gz | tar -xvf - -O
pwned/lana/zip
9WWOPoeJrq6ncvJ
lana@venus:~$ su noa
Password:
noa@venus:/pwned/lana$ cd $HOME
noa@venus:~$
{{< / highlight >}}

## Mission 0x34

{{< highlight plaintext >}}
noa@venus:~$ cat mission.txt
################
# MISSION 0x34 #
################

## EN ##
The password of maia is surrounded by trash

## ES ##
La password de maia esta rodeada de basura
noa@venus:~$ ls -l
total 12
-rw-r----- 1 root noa   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root noa  159 Apr  7 05:55 mission.txt
-rw-r----- 1 root noa 3818 Apr  7 06:00 trash
noa@venus:~$ file trash
trash: PGP Secret Key -
noa@venus:~$ cat trash | grep -Eao "[a-zA-Z0-9]{8,}"
nh1hnDPHpydEjoEN
noa@venus:~$ su maia
Password:
maia@venus:/pwned/noa$ cd $HOME
maia@venus:~$
{{< / highlight >}}

## Mission 0x35

{{< highlight plaintext >}}
maia@venus:~$ cat mission.txt
################
# MISSION 0x35 #
################

## EN ##
The user gloria has forgotten the last 2 characters of her password ... They only remember that they were 2 lowercase letters.

## ES ##
La usuaria gloria ha olvidado los 2 ultimos caracteres de su password... Solo recuerdan que eran 2 letras minusculas.
maia@venus:~$ ls -lhtr
total 12K
-rw-r----- 1 root maia  31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root maia 317 Apr  7 05:55 mission.txt
-rw-r----- 1 root maia  16 Apr  7 06:00 forget
maia@venus:~$ cat forget
v7xUVE2e5bjUc??
maia@venus:~$
{{< / highlight >}}

To generate a wordlist, we can use `crunch`

{{< highlight plaintext >}}
$ crunch 15 15 -t "v7xUVE2e5bjUc@@" -o ./wordlist
Crunch will now generate the following amount of data: 10816 bytes
0 MB
0 GB
0 TB
0 PB
Crunch will now generate the following number of lines: 676

crunch: 100% completed generating output
{{< / highlight >}}

And then use hydra to brute-force the password:

{{< highlight plaintext "hl_lines=11" >}}
$ hydra -l gloria -P ./wordlist ssh://venus.hackmyvm.eu:5000/
Hydra v9.3 (c) 2022 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2022-05-06 22:53:51
[WARNING] Many SSH configurations limit the number of parallel tasks, it is recommended to reduce the tasks: use -t 4
[DATA] max 16 tasks per 1 server, overall 16 tasks, 676 login tries (l:1/p:676), ~43 tries per task
[DATA] attacking ssh://venus.hackmyvm.eu:5000/
[STATUS] 91.00 tries/min, 91 tries in 00:01h, 586 to do in 00:07h, 15 active
[STATUS] 90.33 tries/min, 271 tries in 00:03h, 406 to do in 00:05h, 15 active
[STATUS] 88.00 tries/min, 616 tries in 00:07h, 61 to do in 00:01h, 15 active
[5000][ssh] host: venus.hackmyvm.eu   login: gloria   password: v7xUVE2e5bjUcxw
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2022-05-06 23:01:26
{{< / highlight >}}

## Mission 0x36

{{< highlight plaintext >}}
gloria@venus:~$ cat mission.txt
################
# MISSION 0x36 #
################

## EN ##
User alora likes drawings, that's why she saved her password as ...

## ES ##
A la usuaria alora le gustan los dibujos, por eso ha guardado su password como...
gloria@venus:~$ ls -l
total 12
-rw-r----- 1 root gloria   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root gloria 1713 Apr  7 06:00 image
-rw-r----- 1 root gloria  222 Apr  7 05:55 mission.txt
gloria@venus:~$ cat image

##########################################################
##########################################################
##########################################################
##########################################################
########              ##########  ##              ########
########  ##########  ##    ##  ####  ##########  ########
########  ##      ##  ##  ##  ######  ##      ##  ########
########  ##      ##  ####  ########  ##      ##  ########
########  ##      ##  ##        ####  ##      ##  ########
########  ##########  ##        ####  ##########  ########
########              ##  ##  ##  ##              ########
########################  ####  ##########################
########    ##  ####    ####  ##  ##      ##    ##########
############    ######  ##    ##      ##          ########
########    ##    ##  ##  ##            ####  ##  ########
##############      ##  ##    ######  ##    ####  ########
############    ##      ##  ########    ##  ##  ##########
########################    ####    ##  ##  ####  ########
########              ##    ####            ##  ##########
########  ##########  ######  ##########  ####  ##########
########  ##      ##  ####  ##      ######        ########
########  ##      ##  ##    ##  ######  ##  ####  ########
########  ##      ##  ####          ##    ##  ##  ########
########  ##########  ##      ####  ##  ##################
########              ##  ##                    ##########
##########################################################
##########################################################
##########################################################
##########################################################

gloria@venus:~$
{{< / highlight >}}

Ok, nice. So, since this is a QR code, we can just simply screenshot it and
parse it  using zbar. Or so one would think... apparently a screenshot of the
terminal that loosely resembles a QR code is not enough for zbar to detect it
as a QR code. Therefore, I wrote a simple python program to convert this into
an actual image, and the use zbarimg over that. The simplest image format to
ever exist is probably PPM, so that's what my program will use. The code is
the following:

{{< highlight python "linenos=table" >}}
def main():
    qrcode = None
    with open("./image") as f:
        qrcode = f.readlines()

    scale = 8
    imgsize = (len(qrcode[0])-1, len(qrcode))

    print(f"P3")
    print(f"{imgsize[0]*scale} {imgsize[1]*scale}")
    print(f"255")

    img = list()

    for line in qrcode:
        pixels = bytes([ 255 if c == "#" else 0 for c in line[:-1] ])
        for i in range(scale):
            img.append([[x]*3*scale for x in pixels])

    for m in img:
        print(" ".join([str(x) for p in m for x in p]))
if __name__ == "__main__":
    main()
{{< / highlight >}}

Run this over the ASCII image, save the output on some `out.ppm` file, then run
zbarimg over that.

{{< highlight plaintext >}}
$ zbarimg -Sqrcode.enable ./out.ppm
QR-Code:mhrTFCoxGoqUxtw

scanned 1 barcode symbols from 1 images in 0.02 seconds
{{< / highlight >}}

Another challenge done.

{{< highlight plaintext >}}
gloria@venus:~$ su alora
Password:
alora@venus:/pwned/gloria cd $HOME
alora@venus:~$
{{< / highlight >}}

## Mission 0x37

{{< highlight plaintext >}}
alora@venus:~$ cat mission.txt
################
# MISSION 0x37 #
################

## EN ##
User Julie has created an iso with her password.

## ES ##
La usuaria julie ha creado una iso con su password.
alora@venus:~$ ls -l
total 360
-rw-r----- 1 root alora     31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root alora    172 Apr  7 05:55 mission.txt
-rw-r----- 1 root alora 360448 Apr  7 06:00 music.iso
alora@venus:~$
{{< / highlight >}}

Another mission where we have to download files because the remote computer
does not have the necessary tools (which is fine).

{{< highlight plaintext >}}
$ scp -P 5000 alora@venus.hackmyvm.eu:/pwned/alora/music.iso /tmp/music.iso
alora@venus.hackmyvm.eu's password:
music.iso                            100%  352KB 145.1KB/s   00:02
$ cd /tmp
$ 7z x -so ./music.iso | gunzip
sjDf4i2MSNgSvOv
{{< / highlight >}}

And we have the password.

{{< highlight plaintext >}}
alora@venus:~$ su julie
Password:
julie@venus:/pwned/alora$ cd $HOME
julie@venus:~$
{{< / highlight >}}

## Mission 0x38

{{< highlight plaintext >}}
julie@venus:~$ cat mission.txt
################
# MISSION 0x38 #
################

## EN ##
The user irene believes that the beauty is in the difference.

## ES ##
La usuaria irene cree que en la diferencia esta lo bonito.
julie@venus:~$ head -n3 ./1.txt

UHsjpyRBpRZVRMW
pEYslxXPFLsOAZC
julie@venus:~$ diff ./1.txt  ./2.txt
174c174
< 8VeRLEFkBpe2DSD
---
> aNHRdohjOiNizlU
julie@venus:~$ su irene
Password:
irene@venus:/pwned/julie$ cd $HOME
irene@venus:~$
{{< / highlight >}}

## Mission 0x39

{{< highlight plaintext >}}
irene@venus:~$ cat mission.txt
################
# MISSION 0x39 #
################

## EN ##
The user adela has lent her password to irene.

## ES ##
La usuaria adela le ha dejado prestada su password a irene.
irene@venus:~$ ls -l
total 20
-rw-r----- 1 root irene   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root irene 1679 Apr  7 06:00 id_rsa.pem
-rw-r----- 1 root irene  451 Apr  7 06:00 id_rsa.pub
-rw-r----- 1 root irene  178 Apr  7 05:55 mission.txt
-rw-r----- 1 root irene  256 Apr  7 06:00 pass.enc
irene@venus:~$ openssl rsautl -decrypt -inkey ./id_rsa.pem -in ./pass.enc
nbhlQyKuaXGojHx
irene@venus:~$ su adela
Password:
adela@venus:/pwned/irene$ cd $HOME
adela@venus:~$
{{< / highlight >}}

## Mission 0x40

{{< highlight plaintext >}}
adela@venus:~$ cat mission.txt
################
# MISSION 0x40 #
################

## EN ##
User sky has saved her password to something that can be listened to.

## ES ##
La usuaria sky ha guardado su password en algo que puede ser escuchado.
adela@venus:~$ ls -l
total 12
-rw-r----- 1 root adela  31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root adela 213 Apr  7 05:55 mission.txt
-rw-r----- 1 root adela  44 Apr  7 06:00 wtf
adela@venus:~$ file wtf
wtf: ASCII text
adela@venus:~$ cat wtf
.--. .- .--. .- .--. .- .-. .- -.. .. ... .
adela@venus:~$
{{< / highlight >}}

This looks very much like morse code... we can either use an online decoder...
or more fun is to make one ourselves. Here is what I ended up with:

{{< highlight python "linenos=table" >}}
MORSE_CODE_DICT = { 'a':'.-', 'b':'-...', 'c':'-.-.', 'd':'-..', 'e':'.', 'f':'..-.', 'g':'--.', 'h':'....', 'i':'..', 'j':'.---', 'k':'-.-', 'l':'.-..', 'm':'--', 'n':'-.', 'o':'---', 'p':'.--.', 'q':'--.-', 'r':'.-.', 's':'...', 't':'-', 'u':'..-', 'v':'...-', 'w':'.--', 'x':'-..-', 'y':'-.--', 'z':'--..', '1':'.----', '2':'..---', '3':'...--', '4':'....-', '5':'.....', '6':'-....', '7':'--...', '8':'---..', '9':'----.', '0':'-----', ', ':'--..--', '.':'.-.-.-', '?':'..--..', '/':'-..-.', '-':'-....-', '(':'-.--.', ')':'-.--.-'}
MORSE_CODE_REV_DICT = {v: k for k, v in MORSE_CODE_DICT.items()}

def main():
    msg = ".--. .- .--. .- .--. .- .-. .- -.. .. ... ."
    res = list()
    for c in msg.split(" "):
        res.append(MORSE_CODE_REV_DICT[c] if c in MORSE_CODE_REV_DICT else c)
    print("".join(res))

if __name__ == "__main__":
    main()
{{< / highlight >}}

And here is the result

{{< highlight plaintext >}}
$ python3 ./main.py
papaparadise
{{< / highlight >}}

And indeed when we try to login, it works.

{{< highlight plaintext >}}
adela@venus:~$ su sky
Password:
sky@venus:/pwned/adela$ cd $HOME
sky@venus:~$
{{< / highlight >}}

## Mission 0x41

{{< highlight plaintext >}}
sky@venus:~$ cat mission.txt
################
# MISSION 0x41 #
################

## EN ##
User sarah uses header in http://localhost/key.php

## ES ##
La usuaria sarah utiliza header para http://localhost/key.php
sky@venus:~$ curl http://localhost/key.php

Key header is true?
sky@venus:~$ curl http://localhost/key.php -H "header: true"

Key header is true?
sky@venus:~$ curl http://localhost/key.php -H "Key: true"

LWOHeRgmIxg7fuS
sky@venus:~$ su sarah
Password:
sarah@venus:/pwned/sky$ cd $HOME
sarah@venus:~$
{{< / highlight >}}

## Mission 0x42

{{< highlight plaintext >}}
sarah@venus:~$ cat mission.txt
################
# MISSION 0x42 #
################

## EN ##
The password of mercy is hidden in this directory.

## ES ##
La password de mercy esta oculta en este directorio.
sarah@venus:~$ ls -lhatr
total 36K
-rw-r--r-- 1 sarah sarah  807 Aug  4  2021 .profile
-rw-r--r-- 1 sarah sarah 3.5K Aug  4  2021 .bashrc
-rw-r--r-- 1 sarah sarah  220 Aug  4  2021 .bash_logout
-rw-r----- 1 root  sarah   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root  sarah  175 Apr  7 05:55 mission.txt
drwxr-xr-x 1 root  root  4.0K Apr  7 05:55 ..
-rw-r----- 1 root  sarah   16 Apr  7 06:00 ...
drwxr-x--- 2 root  sarah 4.0K Apr  7 06:00 .
sarah@venus:~$ cat ./...
ym5yyXZ163uIS8L
sarah@venus:~$ su mercy
Password:
mercy@venus:/pwned/sarah$ cd $HOME
mercy@venus:~$
{{< / highlight >}}

## Mission 0x43

{{< highlight plaintext >}}
mercy@venus:~$ cat mission.txt
################
# MISSION 0x43 #
################

## EN ##
User mercy is always wrong with the password of paula.

## ES ##
La usuaria mercy siempre se equivoca con la password de paula.
mercy@venus:~$ ls -lhatr
total 36K
-rw-r--r-- 1 mercy mercy  807 Aug  4  2021 .profile
-rw-r--r-- 1 mercy mercy 3.5K Aug  4  2021 .bashrc
-rw-r--r-- 1 mercy mercy  220 Aug  4  2021 .bash_logout
-rw-r----- 1 root  mercy   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root  mercy  190 Apr  7 05:55 mission.txt
drwxr-xr-x 1 root  root  4.0K Apr  7 05:55 ..
-rw-r----- 1 root  mercy  133 Apr  7 06:00 .bash_history
drwxr-x--- 2 root  mercy 4.0K Apr  7 06:00 .
mercy@venus:~$ cat .bash_history
ls -A
ls
rm /
ps
sudo -l
watch tv
vi /etc/logs
su paula
dlHZ6cvX6cLuL8p
history
history -c
logout
ssh paula@localhost
cat .
ls
ls -l
mercy@venus:~$ su paula
Password:
paula@venus:/pwned/mercy$ cd $HOME
paula@venus:~$
{{< / highlight >}}

## Mission 0x44

{{< highlight plaintext >}}
paula@venus:~$ cat mission.txt
################
# MISSION 0x44 #
################

## EN ##
The user karla trusts me, she is part of my group of friends.

## ES ##
La usuaria karla confia en mi, es parte de mi grupo de amigos.
paula@venus:~$ ls -lhatr
total 32K
-rw-r--r-- 1 paula paula  807 Aug  4  2021 .profile
-rw-r--r-- 1 paula paula 3.5K Aug  4  2021 .bashrc
-rw-r--r-- 1 paula paula  220 Aug  4  2021 .bash_logout
-rw-r----- 1 root  paula   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root  paula  197 Apr  7 05:55 mission.txt
drwxr-xr-x 1 root  root  4.0K Apr  7 05:55 ..
drwxr-x--- 2 root  paula 4.0K Apr  7 05:55 .
paula@venus:~$ groups
paula hidden
paula@venus:~$ find / -type d -group hidden 2>/dev/null
paula@venus:~$ find / -type f -group hidden 2>/dev/null
/usr/src/.karl-a
paula@venus:~$ cat /usr/src/.karl-a
gYAmvWY3I7yDKRf
paula@venus:~$ su karla
Password:
karla@venus:/pwned/paula$ cd $HOME
karla@venus:~$
{{< / highlight >}}

## Mission 0x45

{{< highlight plaintext >}}
karla@venus:~$ cat mission.txt
################
# MISSION 0x45 #
################

## EN ##
User denise has saved her password in the image.

## ES ##
La usuaria denise ha guardado su password en la imagen.
karla@venus:~$ ls -lhatr
total 68K
-rw-r--r-- 1 karla karla  807 Aug  4  2021 .profile
-rw-r--r-- 1 karla karla 3.5K Aug  4  2021 .bashrc
-rw-r--r-- 1 karla karla  220 Aug  4  2021 .bash_logout
-rw-r----- 1 root  karla   31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root  karla  176 Apr  7 05:55 mission.txt
drwxr-xr-x 1 root  root  4.0K Apr  7 05:55 ..
-rw-r----- 1 root  karla  33K Apr  7 06:00 yuju.jpg
drwxr-x--- 2 root  karla 4.0K Apr  7 06:00 .
karla@venus:~$ file yuju.jpg
yuju.jpg: JPEG image data, JFIF standard 1.01, resolution (DPI), density 96x96, segment length 16, Exif Standard: [TIFF image data, big-endian, direntries=4], baseline, precision 8, 442x463, components 3
karla@venus:~$
{{< / highlight >}}

Yet another challenge where you need to download the file. You can use `scp` as
was with the other challenges. After opening the image, you can see that it is
a simple image. However, after looking at the metadata:

{{< highlight plaintext >}}
$ exiftool ./yuju.jpg
ExifTool Version Number         : 12.33
File Name                       : yuju.jpg
Directory                       : .
File Size                       : 32 KiB
File Modification Date/Time     : 2022:05:07 15:21:32+01:00
File Access Date/Time           : 2022:05:07 15:21:41+01:00
File Inode Change Date/Time     : 2022:05:07 15:21:32+01:00
File Permissions                : -rw-r-----
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Resolution Unit                 : inches
X Resolution                    : 96
Y Resolution                    : 96
Exif Byte Order                 : Big-endian (Motorola, MM)
Artist                          : sML
Date/Time Original              : 2021:11:01 10:34:51
Create Date                     : 2021:11:01 10:34:51
Sub Sec Time Original           : 95
Sub Sec Time Digitized          : 95
XP Author                       : sML
Padding                         : (Binary data 2060 bytes, use -b option to extract)
XMP Toolkit                     : Image::ExifTool 12.16
About                           : pFg92DpGucMWccA
Creator                         : sML
Image Width                     : 442
Image Height                    : 463
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 442x463
Megapixels                      : 0.205
Create Date                     : 2021:11:01 10:34:51.95
Date/Time Original              : 2021:11:01 10:34:51.95
{{< / highlight >}}

We find the password. And indeed we can login:

{{< highlight plaintext >}}
karla@venus:~$ su denise
Password:
denise@venus:/pwned/karla$ cd $HOME
denise@venus:~$
{{< / highlight >}}

## Mission 0x46

{{< highlight plaintext >}}
denise@venus:~$ cat mission.txt
################
# MISSION 0x46 #
################

## EN ##
The user zora is screaming doas!

## ES ##
La usuaria zora no deja de gritar doas!
denise@venus:~$ doas -h
doas: invalid option -- 'h'
usage: doas [-Lns] [-C config] [-u user] command [args]
denise@venus:~$ doas -u zora bash
doas (denise@venus) password:
zora@venus:/pwned/denise$ cd $HOME
zora@venus:~$
{{< / highlight >}}

## Mission 0x47

{{< highlight plaintext >}}
zora@venus:~$ cat mission.txt
################
# MISSION 0x47 #
################

## EN ##
The user belen has left her password in venus.hmv

## ES ##
La usuaria belen ha dejado su password en venus.hmv
zora@venus:~$ curl http://venus.hmv
2jA0E8bQ4WrGwWZ
zora@venus:~$ su belen
Password:
belen@venus:/pwned/zora$ cd $HOME
belen@venus:~$
{{< / highlight >}}

## Mission 0x48

{{< highlight plaintext >}}
belen@venus:~$ cat mission.txt
################
# MISSION 0x48 #
################

## EN ##
It seems that belen has stolen the password of the user leona...

## ES ##
Parece que belen ha robado el password de la usuaria leona..
belen@venus:~$ ls -l
total 12
-rw-r----- 1 root belen  31 Apr  7 05:55 flagz.txt
-rw-r----- 1 root belen 197 Apr  7 05:55 mission.txt
-rw-r----- 1 root belen  32 Apr  7 06:00 stolen.txt
belen@venus:~$ cat stolen.txt
$1$leona$lhWp56YnWAMz6z32Bw53L0
belen@venus:~$
{{< / highlight >}}

This is not a password, but a password hash. Let's crack it. First download the
file to our machine and then we can run hashcat over it:

{{< highlight plaintext >}}
$ hashcat -a 0 ./hash /usr/share/dict/seclists/Passwords/Leaked-Databases/rockyou.txt
hashcat (v6.2.5) starting in autodetect mode

nvmlDeviceGetFanSpeed(): Not Supported

CUDA API (CUDA 11.6)
====================
* Device #1: NVIDIA GeForce GTX 1060, 6015/6078 MB, 10MCU

OpenCL API (OpenCL 3.0 CUDA 11.6.134) - Platform #1 [NVIDIA Corporation]
========================================================================
* Device #2: NVIDIA GeForce GTX 1060, skipped

Hash-mode was not specified with -m. Attempting to auto-detect hash mode.
The following mode was auto-detected as the only one matching your input hash:

500 | md5crypt, MD5 (Unix), Cisco-IOS $1$ (MD5) | Operating System

NOTE: Auto-detect is best effort. The correct hash-mode is NOT guaranteed!
Do NOT report auto-detect issues unless you are certain of the hash type.

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 256

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates
Rules: 1

Optimizers applied:
* Zero-Byte
* Single-Hash
* Single-Salt

ATTENTION! Pure (unoptimized) backend kernels selected.
Pure kernels can crack longer passwords, but drastically reduce performance.
If you want to switch to optimized kernels, append -O to your commandline.
See the above message to find out about the exact limits.

Watchdog: Temperature abort trigger set to 90c

Host memory required for this attack: 1426 MB

Dictionary cache built:
* Filename..: /usr/share/dict/seclists/Passwords/Leaked-Databases/rockyou.txt
* Passwords.: 14344391
* Bytes.....: 139921497
* Keyspace..: 14344384
* Runtime...: 1 sec

$1$leona$lhWp56YnWAMz6z32Bw53L0:freedom

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 500 (md5crypt, MD5 (Unix), Cisco-IOS $1$ (MD5))
Hash.Target......: $1$leona$lhWp56YnWAMz6z32Bw53L0
Time.Started.....: Sat May  7 15:28:37 2022 (0 secs)
Time.Estimated...: Sat May  7 15:28:37 2022 (0 secs)
Kernel.Feature...: Pure Kernel
Guess.Base.......: File (/usr/share/dict/seclists/Passwords/Leaked-Databases/rockyou.txt)
Guess.Queue......: 1/1 (100.00%)
Speed.#1.........:   612.2 kH/s (7.88ms) @ Accel:64 Loops:250 Thr:32 Vec:1
Recovered........: 1/1 (100.00%) Digests
Progress.........: 20480/14344384 (0.14%)
Rejected.........: 0/20480 (0.00%)
Restore.Point....: 0/14344384 (0.00%)
Restore.Sub.#1...: Salt:0 Amplifier:0-1 Iteration:750-1000
Candidate.Engine.: Device Generator
Candidates.#1....: 123456 -> michael!
Hardware.Mon.#1..: Temp: 55c Util: 33% Core:1721MHz Mem:3802MHz Bus:16

Started: Sat May  7 15:28:24 2022
Stopped: Sat May  7 15:28:38 2022
{{< / highlight >}}

Success.

{{< highlight plaintext >}}
belen@venus:~$ su leona
Password:
leona@venus:/pwned/belen$ cd $HOME
leona@venus:~$
{{< / highlight >}}

## Mission 0x49

{{< highlight plaintext >}}
leona@venus:~$ cat mission.txt 
################
# MISSION 0x49 #
################

## EN ##
User ava plays a lot with the DNS of venus.hmv lately... 

## ES ##
La usuaria ava juega mucho con el DNS de venus.hmv ultimamente...
leona@venus:~$ cd /etc/bind
leona@venus:/etc/bind$ grep -IRn "venus.hmv" .
grep: ./rndc.key: Permission denied
./named.conf.local:10:zone "venus.hmv" IN {
./named.conf.local:12:      file "/etc/bind/db.venus.hmv";
./db.venus.hmv:6:@       IN      SOA     ns1.venus.hmv. root.venus.hmv. (
./db.venus.hmv:16:@       IN      NS      ns1.venus.hmv.
leona@venus:/etc/bind$ cat db.venus.hmv

;
; BIND data file for local loopback interface
;
    604800
@       IN      SOA     ns1.venus.hmv. root.venus.hmv. (
                              2         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL

;@      IN      NS      localhost.
;@      IN      A       127.0.0.1
;@      IN      AAAA    ::1
@       IN      NS      ns1.venus.hmv.

;IP address of Name Server

ns1     IN      A       127.0.0.1
ava IN      TXT     oCXBeeEeYFX34NU

leona@venus:/etc/bind$ su ava
Password: 
ava@venus:/etc/bind$ cd $HOME
ava@venus:~$
{{< / highlight >}}

## Mission 0x50

This last mission is a riddle which I was not able to figure out. Will try
again some other time, maybe.


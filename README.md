# hass

> Were it to benefit my country I would lay down my life; What then is risk to
> me?
>
> —Lin Zexu

**hass** is a simple TCP tunnel for the naive. It significantly increases the
*gesture level* of your data in transit, "making some big news" in the process.

It boasts the following (lack of) features:

- **No privacy**: Tell the world that you are a mogician, and be proud of it.
- **No performance**: You don't need to run faster than the western reporters.
Rather, take slow steps and learn from the life experiences of the elder.
- **No reliability**: Don't try to make any big news. Even the elder has only
done three little things!

## Getting started

- `yarn build`
- `dist/hass-server -s 127.0.0.1 -p 1926 -l 8888 -k 'excited'`
- `dist/hass-client -s 127.0.0.1 -p 8888 -l 1976 -k 'excited'`

Now you can access port 1976, and have it forwarded to 127.0.0.1:1926 via
127.0.0.1:8888.

- +1s: `sudo tcpdump -lnpi lo tcp port 8888 -s 32000 -w - | tcpflow -B -C -r - | strings -e S -n 1`

## Disclaimer

If you haven't realized, this is a [joke project](https://en.wikipedia.org/wiki/Moha_culture).

Due to broken TCP timing, it's not very useful besides browsing
http://example.com :joy: You may have better luck running this in your local
network.

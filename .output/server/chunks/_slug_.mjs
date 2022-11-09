import { defineEventHandler, createError } from 'h3';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { s as serverSupabaseClient } from './serverSupabaseClient.mjs';
import '@supabase/supabase-js';
import './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'defu';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const useUrl = () => "https://meetoon.co";

const _slug_ = defineEventHandler(async (event) => {
  const client = serverSupabaseClient(event);
  const url = useUrl();
  const slug = event.context.params.slug;
  const fonts = ["arial.ttf", "arial_bold.ttf"];
  try {
    const { data, error } = await client.from("posts").select("title, profiles(name, avatar_url)").eq("slug", slug).single();
    if (error)
      throw Error(error.message);
    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            letterSpacing: "-.02em",
            fontWeight: 700,
            background: "#f8f9fa"
          },
          children: [
            {
              type: "img",
              props: {
                style: {
                  right: 42,
                  bottom: 42,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  width: "300px"
                },
                src: url + "/banner.png"
              }
            },
            {
              type: "div",
              props: {
                style: {
                  left: 42,
                  bottom: 42,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center"
                },
                children: [
                  {
                    type: "img",
                    props: {
                      style: {
                        width: "70px",
                        height: "70px",
                        borderRadius: "9999px"
                      },
                      src: data.profiles.avatar_url
                    }
                  },
                  {
                    type: "p",
                    props: {
                      style: {
                        marginLeft: "20px",
                        fontSize: "24px"
                      },
                      children: data.profiles.name
                    }
                  }
                ]
              }
            },
            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  padding: "20px 50px",
                  margin: "0 42px 150px 42px",
                  fontSize: "64px",
                  width: "auto",
                  maxWidth: 1200 - 48 * 2,
                  textAlign: "center",
                  backgroundColor: "#2D2D2D",
                  borderRadius: "30px",
                  color: "white",
                  lineHeight: 1.4
                },
                children: data.title
              }
            }
          ]
        }
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Arial",
            data: readFileSync(join(process.cwd(), "public/fonts", fonts[0])),
            weight: 400,
            style: "normal"
          },
          {
            name: "Arial",
            data: readFileSync(join(process.cwd(), "public/fonts", fonts[1])),
            weight: 700,
            style: "normal"
          }
        ]
      }
    );
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: "width",
        value: 1200
      },
      font: {
        fontFiles: fonts.map((i) => join(resolve("."), "public/fonts", i)),
        loadSystemFonts: false
      }
    });
    const resolved = await Promise.all(
      resvg.imagesToResolve().map(async (url2) => {
        console.info("image url", url2);
        const img = await fetch(url2);
        const buffer = await img.arrayBuffer();
        return {
          url: url2,
          buffer: Buffer.from(buffer)
        };
      })
    );
    if (resolved.length > 0) {
      for (const result of resolved) {
        const { url: url2, buffer } = result;
        resvg.resolveImage(url2, buffer);
      }
    }
    const renderData = resvg.render();
    const pngBuffer = renderData.asPng();
    event.res.setHeader("Cache-Control", "s-maxage=7200, stale-while-revalidate");
    return pngBuffer;
  } catch (err) {
    return createError({ statusCode: 500, statusMessage: err });
  }
});

export { _slug_ as default };
//# sourceMappingURL=_slug_.mjs.map

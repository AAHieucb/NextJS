// # Dùng pages/api
// Edge API Route

import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge', // enable
}

export default async function handler(req: NextRequest) {
  // Lấy data sẽ khác vì Edge Route API nhanh hơn nhưng dùng standard web API
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')
  console.log(name);

  // forward header request sang 1 url khác 
  // const authorization = req.cookies.get('authorization')
  // return fetch('https://backend-api.com/api/protected', {
  //   method: req.method,
  //   headers: {
  //     authorization,
  //   },
  //   redirect: 'manual',
  // })

  return new Response(
    JSON.stringify({
      name: 'Jim Halpert',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600', // Dùng cache control
      },
    }
  )
}
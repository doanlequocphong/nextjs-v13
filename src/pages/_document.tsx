import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { randomBytes } from 'crypto'
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)

      // nonce một chuỗi được tạo ra một cách ngẫu nhiên và được sử dụng để giúp bảo vệ nội dung của trang web khỏi các cuộc tấn công Cross-Site Scripting (XSS)
      // đặc biệt là khi làm việc với CSP (Content Security Policy)
      // CSP là một cơ chế bảo mật giúp ngăn chặn các cuộc tấn công XSS và dữ liệu không an toàn từ các nguồn không xác định
      const nonce = randomBytes(128).toString('base64') // number used once

      if (typeof ctx.res !== 'undefined') {
        console.dir('this never happens so I cannot use ctx.res.setHeader');
      }
      return {
        ...initialProps,
        nonce,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const { nonce }: any = this.props

    return (
      <Html lang="ja">
        <Head nonce={nonce} />
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    )
  }
}

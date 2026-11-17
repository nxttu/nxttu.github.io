import http.server
import socketserver


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    """Static file server with no-store headers so the preview never serves stale files."""

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


if __name__ == '__main__':
    port = 80
    with socketserver.TCPServer(('0.0.0.0', port), NoCacheHandler) as httpd:
        httpd.serve_forever()

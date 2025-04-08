# Sử dụng image chính thức của Node.js
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và yarn.lock vào container
COPY package.json yarn.lock ./

# Cài đặt dependencies sử dụng Yarn
# --verbose để xem thông báo lỗi đầy đủ
RUN yarn install --verbose
# --frozen-lockfile : 
#     + cài đặt đúng với trạng thái của tệp yarn.lock
#     + nếu yarn.lock không khớp với package.json  (ví dụ: nếu có sự thay đổi trong package.json mà chưa cập nhật lại yarn.lock), quá trình cài đặt sẽ bị dừng và thông báo lỗi
# RUN yarn install --frozen-lockfile --verbose

# Sao chép tất cả mã nguồn từ thư mục hiện tại vào container
COPY . .
ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1

# Mở port mà ứng dụng Next.js sẽ chạy (mặc định là 3000)
EXPOSE 3000

# Lệnh chạy ứng dụng khi container được khởi động
CMD ["yarn", "dev"]

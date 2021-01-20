# pull pnpm image
FROM ianwalter/pnpm AS dev-deps
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY . .
RUN pnpm install -r --frozen-lockfile && rm -rf ~/.pnpm-store;
RUN pnpm build

# production environment
FROM nginx:stable-alpine
COPY --from=dev-deps /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


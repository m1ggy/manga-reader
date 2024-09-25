FROM node:20 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Define build arguments for environment variables
ARG VITE_TITLE
ARG VITE_API_URL
ARG VITE_META_URL
# Set environment variables during the build process
ENV VITE_TITLE=$VITE_TITLE
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_META_URL=$VITE_META_URL

FROM base AS app
WORKDIR /app
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm i
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
import esbuild from 'esbuild';

export interface InterwebBuildOptions extends esbuild.BuildOptions {
  // Add any Interweb-specific options here
  customPlugins?: esbuild.Plugin[];
}

export const defaultOptions: InterwebBuildOptions = {
  bundle: true,
  minify: false,
  outfile: 'dist/bundle.js',
  platform: 'neutral',
  sourcemap: true,
  target: 'es2022',
  logLevel: 'info',
  format: 'esm',
  minifyIdentifiers: false,
  minifySyntax: false,
  minifyWhitespace: false,
  treeShaking: false,
};

export const InterwebBuild = {
  async build(options: Partial<InterwebBuildOptions> = {}): Promise<esbuild.BuildResult> {
    const mergedOptions: InterwebBuildOptions = { ...defaultOptions, ...options };

    // Apply custom plugins if any
    if (mergedOptions.customPlugins) {
      mergedOptions.plugins = [
        ...(mergedOptions.plugins || []),
        ...mergedOptions.customPlugins
      ];
      delete mergedOptions.customPlugins;
    }

    // @ts-ignore
    return esbuild.build(mergedOptions);
  }
};


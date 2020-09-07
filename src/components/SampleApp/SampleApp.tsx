import React, { useState } from 'react';
import Axios, { AxiosRequestConfig } from 'axios';
import { FileDownloadHelper } from '@bbon/filedownload';

import 'github-fork-ribbon-css/gh-fork-ribbon.css';

export const SampleApp = () => {
    const [fileName, setFileName] = useState('sample');
    const [fileDownloadUrl, setFileDownloadUrl] = useState('images/sample.png');
    const [loading, setLoading] = useState(false);

    const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setFileDownloadUrl(url);
    };

    const handleChangeFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setFileName(url);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (fileDownloadUrl) {
            setLoading(true);
            const requestConfig: AxiosRequestConfig = {
                ...Axios.defaults,
                responseType: 'blob',
            };
            Axios.get(fileDownloadUrl, requestConfig)
                .then((res) => {
                    if (res) {
                        const contentType =
                            res.headers['content-type'] || 'application/octet-stream';
                        const helper = new FileDownloadHelper();
                        helper.download({
                            data: res.data,
                            filename: fileName,
                            contentType,
                        });
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <div className="container-fluid p-3">
            <div className="alert alert-secondary" role="alert">
                <h4 className="alert-heading">Samlpe: File Download</h4>
                <p>Usage:</p>
                <ol>
                    <li>Input uri to wish download</li>
                    <li>Input file name to download</li>
                    <li>Click download button</li>
                </ol>
                <hr />
                <p className="mb-0">
                    This site describes{' '}
                    <a
                        href="https://www.npmjs.com/package/@bbon/filedownload"
                        title="npm @bbon/filedownload"
                    >
                        <code>@bbon/filedownload</code>
                    </a>{' '}
                    usages.
                </p>
                <p className="mb-0">
                    Find a Current site code at <a>gitHub: </a>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="filedownloadurl">URI</label>
                    <input
                        id="filedownloadurl"
                        disabled={loading}
                        onChange={handleChangeUrl}
                        value={fileDownloadUrl}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="filename">FileName</label>
                    <input
                        id="filename"
                        disabled={loading}
                        onChange={handleChangeFileName}
                        value={fileName}
                        className="form-control"
                    />
                </div>

                <button className="btn btn-primary" type="submit" disabled={loading}>
                    Download
                </button>
            </form>

            <a
                className="github-fork-ribbon"
                href="https://github.com/bbonkr/bbon-filedownload-sample"
                data-ribbon="Fork me on GitHub"
                title="Fork me on GitHub"
            >
                Fork me on GitHub
            </a>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const Production = () => {
  const [apiData, setApiData] = useState(null); // api.mdの内容を保存
  const [s3Data, setS3Data] = useState([]); // S3から取得したデータを保存
  const [isLoading, setIsLoading] = useState(false); // ロード状態を管理
  const [error, setError] = useState(null); // エラー状態を管理

  // AWS S3クライアントの設定
  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, // IAMユーザーのアクセスキー
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY, // IAMユーザーのシークレットキー
    region: 'us-west-2', // S3バケットのリージョン例
  });

  // HTTP経由で`api.md`を読み込む処理
  useEffect(() => {
    const fetchApiFile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api-md'); // サーバー上の`api.md`エンドポイント
        if (!response.ok) {
          throw new Error('api.mdの取得に失敗しました');
        }
        const text = await response.text();
        console.log('api.mdを読み込みました:', text);
        setApiData(text);
      } catch (err) {
        console.error('api.mdの読み込み中にエラーが発生しました:', err);
        setError('api.mdの読み込みに失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiFile();
  }, []);

  // S3から制作物データを取得
  const fetchProductionData = async () => {
    setIsLoading(true);
    try {
      const params = {
        Bucket: 'my-bucket-20241207', // バケット名
        Prefix: '', // フォルダのパスが必要なら指定
      };

      s3.listObjectsV2(params, async (err, data) => {
        if (err) {
          throw new Error('S3からのデータ取得中にエラーが発生しました: ' + err.message);
        } else {
          const fetchedData = await Promise.all(
            data.Contents.map(async (item) => {
              const fileUrl = s3.getSignedUrl('getObject', {
                Bucket: params.Bucket,
                Key: item.Key,
                Expires: 60, // URLの有効期限（秒）
              });

              const response = await fetch(fileUrl);
              const contentType = response.headers.get('Content-Type');

              if (contentType.startsWith('text/')) {
                const textContent = await response.text();
                return { type: 'text', content: textContent, key: item.Key };
              } else if (contentType.startsWith('image/')) {
                return { type: 'image', content: fileUrl, key: item.Key };
              } else if (contentType.startsWith('audio/')) {
                return { type: 'audio', content: fileUrl, key: item.Key };
              } else if (contentType.startsWith('video/')) {
                return { type: 'video', content: fileUrl, key: item.Key };
              } else {
                return { type: 'unknown', content: '', key: item.Key };
              }
            })
          );

          setS3Data(fetchedData);
          console.log('S3から取得した制作物データ:', fetchedData);
        }
      });
    } catch (err) {
      console.error(err);
      setError('S3データ取得中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Production Screen</h1>
      {isLoading && <p>データをロード中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error && (
        <>
          <button onClick={fetchProductionData} style={styles.button}>
            制作物を取得
          </button>
          <div style={styles.dataContainer}>
            {s3Data.map((data, index) => (
              <div key={index} style={styles.dataItem}>
                <div style={styles.number}>{index + 1}.</div>
                <div style={styles.content}>
                  {data.type === 'image' && (
                    <img src={data.content} alt={`Image ${index + 1}`} style={styles.image} />
                  )}
                  {data.type === 'text' && <pre style={styles.text}>{data.content}</pre>}
                  {data.type === 'audio' && (
                    <audio controls style={styles.audio}>
                      <source src={data.content} type="audio/mpeg" />
                      お使いのブラウザではオーディオ再生に対応していません。
                    </audio>
                  )}
                  {data.type === 'video' && (
                    <video controls style={styles.video}>
                      <source src={data.content} type="video/mp4" />
                      お使いのブラウザではビデオ再生に対応していません。
                    </video>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// CSSをインラインで定義
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '100vh',
    margin: '0',
    padding: '0',
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  dataItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
    width: '100%',
  },
  number: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '10px',
  },
  content: {
    flex: 1,
  },
  image: {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  text: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    maxWidth: '100%',
  },
  audio: {
    width: '300px',
  },
  video: {
    width: '300px',
    height: '200px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '20px 0',
  },
};

export default Production;
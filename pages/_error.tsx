import { ErrorView } from '../components/common/ErrorView/ErrorView';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Error() {
  const router = useRouter();

  return (
    <ErrorView
      title="*Something went wrong.*"
      description="Please, go back and log in again."
      primaryButton={{
        text: 'Back to login page',
        onClick: async () => {
          await axios.post('http://localhost:3000/api/upload/curriculumBase', {
            body: {
              name: 'toyota-02',
              modules: [
                {
                  id: 'mwc1',
                  name: 'Modeling with classes (I)',
                  tasks: [
                    {
                      id: 'mwc1.info.properties.md',
                      name: 'Class with properties that capture the data aspects of a core noun',
                      type: 'info',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/master/outlines/model_with_classes_1/mwc1.info.properties.md?token=GHSAT0AAAAAABTYCY45NZCOKFW32R4XZH26YTKUPLA',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mvc1.info.constructor.md',
                      name: 'Class with constructor that initialize the data',
                      type: 'info',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/master/outlines/model_with_classes_1/mvw1.info.constructor.md?token=GHSAT0AAAAAABTYCY45PUM3W4MWWX5IXYRUYTKUPSQ',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc1.info.class_methods.md',
                      name: 'Class methods which change class state',
                      type: 'info',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/master/outlines/model_with_classes_1/mwc1.info.class_methods.md?token=GHSAT0AAAAAABTYCY444O3YM57HSZCSQZWQYTKUQAQ',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc1.code.toggl_task.md',
                      name: 'Toggl task',
                      type: 'code',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/master/outlines/model_with_classes_1/mwc1.code.dart.toggl_task.md?token=GHSAT0AAAAAABTYCY443LZJRU53ZZTFDGOYYTKUQJQ',
                      link: 'https://github.com/tpa-nextgen/mwc1.tf16.toggl_task.code.dart',
                      kind: 'formative',
                    },
                    {
                      id: 'mwc1.code.spotify_playlist.md',
                      name: 'Spotify playlist',
                      type: 'code',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/master/outlines/model_with_classes_1/mwc1.code.dart.spotify_playlist.md?token=GHSAT0AAAAAABTYCY456MI5VDQW3MRXIKAOYTKUQRQ',
                      link: 'https://github.com/tpa-nextgen/mwc1.spotify_playlist.code.dart',
                      kind: 'summative',
                    },
                  ],
                },
                {
                  id: 'mwc2',
                  name: 'Modeling with classes (II)',
                  tasks: [
                    {
                      id: 'mwc2.info.aggregation.md',
                      name: 'Objects as a Property',
                      type: 'info',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.aggregation.md?token=GHSAT0AAAAAABTYCY44FYPHU6JPGDHGM5SQYTKUSLQ',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mvc2.code.movies_database.md',
                      name: 'Movies database',
                      type: 'code',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.code.dart.movies_database.md?token=GHSAT0AAAAAABTYCY45TH7MJDXM6FHBNEFMYTKUSUA',
                      link: 'https://github.com/tpa-nextgen/mwc1.tf07.movies_database.code.dart',
                      kind: 'formative',
                    },
                    {
                      id: 'mwc2.info.copy_of_object.md',
                      name: 'Creating a Copy of an Object',
                      type: 'info',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.copy_of_object.md?token=GHSAT0AAAAAABTYCY447BIHWHBIVH7IKSHQYTKUS6Q',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc2.code.movies_statistics.md',
                      name: 'Toggl task',
                      type: 'code',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.code.dart.movies_statistics.md?token=GHSAT0AAAAAABTYCY45LF3EYKA5FRXSSS6UYTKUTFA',
                      link: 'https://github.com/tpa-nextgen/mwc1.tf10.movies_statistics.code.dart',
                      kind: 'summative',
                    },
                  ],
                },
                {
                  id: 'mwc3',
                  name: 'Modeling with classes (III)',
                  tasks: [
                    {
                      id: 'mwc3.mcq.access_modifiers.md',
                      name: 'Access modifiers',
                      type: 'info',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.access_modifiers.md?token=GHSAT0AAAAAABTYCY45WIBOIMBYUK2XTQAEYTKUTUA',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc3.mcq.immutability.md',
                      name: 'Immutability',
                      type: 'info',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.immutability.md?token=GHSAT0AAAAAABTYCY45BUSBMLXHOAH7K7ROYTKUT3A',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc3.mcq.static.md',
                      name: 'Static Properties and Methods',
                      type: 'info',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.static.md?token=GHSAT0AAAAAABTYCY45DJIGOOUQE4KDXV6GYTKUUCQ',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc3.mcq.scope.md',
                      name: 'Scope',
                      type: 'info',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.info.dart.scope.md?token=GHSAT0AAAAAABTYCY44D7VDSXPW4K2EKSPCYTKUUQQ',
                      link: null,
                      kind: 'formative',
                    },
                    {
                      id: 'mwc3.mcq.tasks_manager.md',
                      name: 'Task manager',
                      type: 'code',
                      description:
                        'https://raw.githubusercontent.com/tpa-nextgen/modules-master/1cd29d1f9fc592be29aa523d7500cf60aa6b0725/outlines/model_with_classes_1/mwc1.code.dart.tasks_manager.md?token=GHSAT0AAAAAABTYCY44UMNFAXIXTZYL7PWCYTKUU3A',
                      link: 'https://github.com/tpa-nextgen/mwc1.tf16.tasks_manager.code.dart',
                      kind: 'summative',
                    },
                  ],
                },
              ],
            },
          });
          // router.push('/login');
        },
      }}
    />
  );
}

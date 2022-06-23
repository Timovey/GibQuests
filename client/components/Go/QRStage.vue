<template>
    <div>
        <v-card :loading="loading">
            <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
            </template>
            <ImageInput camera @change="setImage" :background="background"/>

        </v-card>
        <v-snackbar
            v-model="error"
            timeout="3000"
        >
            <span class="red--text">{{errorText}}</span>
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="indigo"
                    text
                    v-bind="attrs"
                    @click="error = false"
                >
                    Окей
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import ImageInput from '~/components/UI/ImageInput'
import QrScanner from 'qr-scanner';
import { throws } from 'assert';
export default {
    components:{
        ImageInput
    },
    data(){
        return{
            background: null,
            qr: '',
            error: false,
            errorText: '',
            loading: false
        }
    },
    props:{
        codeWord: {
            required: true,
            type: String
        }
    },
    methods:{
        setImage(e){
            const ctx = this
            this.loading = true
            this.qr = e
            let reader = new FileReader();
            reader.readAsDataURL(e);
            reader.onload = function () {
                this.background = reader.result
            }.bind(this);
            QrScanner.scanImage(e)
                .then(result => {
                    this.$router.push(`?q=${result}`)
                    this.loading = false
                    this.error = false
                    if(result==this.codeWord){
                        ctx.$emit('stageComplete')
                    }
                    else {
                        this.error=true
                        this.errorText = 'Неверный код'
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.error=true
                    this.errorText='QR-код не найден'
                    this.loading = false
                });
        },
    }
}
</script>

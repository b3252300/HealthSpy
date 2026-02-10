<template>
<!-- ========== FOOTER ========== -->
<footer class="container-ls py-4 ls-footer">
        <div class="row align-items-md-center text-center text-md-start">
            <div class="col-md mb-3 mb-md-0">
                <p class="fs-5 mb-0">© 2022 Landseed Member Club</p>
            </div>

            <div class="col-md d-md-flex justify-content-md-end">
                <!-- START 條款連結 -->
                <ul class="list-inline list-px-2 mb-0">
                    <li class="list-inline-item">
                        <a class="link link-info link-light-75" :href="Privacy.path"
                            target="_blank">{{ Privacy.title }}</a>
                    </li>
                    <li class="list-inline-item">
                        <p class="fs-5 mb-0">{{ version }} 版</p>
                    </li>
                </ul>
                <!-- End 條款連結 -->
            </div>
        </div>
    </footer>
    <!-- ========== END FOOTER ========== -->
</template>
<script setup>
import   path   from '@/api/path';
const version = import.meta.env.VITE_VERSION;
const { Privacy } = path();

</script>